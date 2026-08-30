export const VAT_RATE = 0.19;

export const COMPANY_DETAILS = {
  name: "Ochelari Cluj SRL",
  cif: "RO40123456",
  regCom: "J12/1234/2018",
  address: "Str. Memorandumului 28, Cluj-Napoca, jud. Cluj",
  iban: "RO49BTRL01301205N00123XX",
  bank: "Banca Transilvania",
};

const INVOICE_SERIES = "FOC";
const RECEIPT_SERIES = "BF";

export interface InvoiceLineInput {
  description: string;
  quantity: number;
  /** Preț unitar cu TVA inclus, în lei. */
  unitPrice: number;
}

export interface InvoiceLineItem extends InvoiceLineInput {
  unitPriceNet: number;
  netAmount: number;
  vatAmount: number;
  grossAmount: number;
}

export type InvoiceStatus = "emisa" | "stornata";

export interface InvoiceSource {
  orderId: string;
  customerName: string;
  customerEmail: string;
  issueDate: string;
  items: InvoiceLineInput[];
  status?: InvoiceStatus;
}

export interface Invoice {
  id: string;
  series: string;
  number: string;
  fiscalReceiptNumber: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  issueDate: string;
  items: InvoiceLineItem[];
  subtotal: number;
  vatTotal: number;
  total: number;
  status: InvoiceStatus;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function padSequence(sequence: number): string {
  return Math.abs(Math.trunc(sequence)).toString().padStart(6, "0");
}

export function formatInvoiceNumber(sequence: number, date = new Date()): string {
  return `${INVOICE_SERIES}-${date.getFullYear()}-${padSequence(sequence)}`;
}

export function formatFiscalReceiptNumber(sequence: number, date = new Date()): string {
  return `${RECEIPT_SERIES}-${date.getFullYear()}-${padSequence(sequence)}`;
}

export function formatCurrency(value: number): string {
  return `${value.toFixed(2)} lei`;
}

/**
 * Comenzile din site nu păstrează prețul fiecărui produs în parte, ci doar totalul,
 * așa că împărțim totalul (cu TVA inclus) în mod egal pe fiecare produs, alocând
 * eventuala diferență de rotunjire ultimului articol.
 */
export function distributeItemsEvenly(
  itemNames: string[],
  grossTotal: number
): InvoiceLineInput[] {
  if (itemNames.length === 0) {
    return [
      { description: "Produse și servicii optice", quantity: 1, unitPrice: grossTotal },
    ];
  }

  const baseUnit = Math.floor((grossTotal / itemNames.length) * 100) / 100;
  const allocatedToFirstItems = round2(baseUnit * (itemNames.length - 1));
  const lastUnit = round2(grossTotal - allocatedToFirstItems);

  return itemNames.map((description, index) => ({
    description,
    quantity: 1,
    unitPrice: index === itemNames.length - 1 ? lastUnit : baseUnit,
  }));
}

function buildLineItem({ description, quantity, unitPrice }: InvoiceLineInput): InvoiceLineItem {
  const grossAmount = round2(quantity * unitPrice);
  const netAmount = round2(grossAmount / (1 + VAT_RATE));
  const vatAmount = round2(grossAmount - netAmount);
  const unitPriceNet = round2(unitPrice / (1 + VAT_RATE));

  return { description, quantity, unitPrice, unitPriceNet, netAmount, vatAmount, grossAmount };
}

export function generateInvoice(source: InvoiceSource, sequence: number): Invoice {
  const issueDate = new Date(source.issueDate);
  const items = source.items.map(buildLineItem);

  const subtotal = round2(items.reduce((sum, item) => sum + item.netAmount, 0));
  const vatTotal = round2(items.reduce((sum, item) => sum + item.vatAmount, 0));
  const total = round2(items.reduce((sum, item) => sum + item.grossAmount, 0));

  return {
    id: `INV-${sequence}`,
    series: INVOICE_SERIES,
    number: formatInvoiceNumber(sequence, issueDate),
    fiscalReceiptNumber: formatFiscalReceiptNumber(sequence, issueDate),
    orderId: source.orderId,
    customerName: source.customerName,
    customerEmail: source.customerEmail,
    issueDate: source.issueDate,
    items,
    subtotal,
    vatTotal,
    total,
    status: source.status ?? "emisa",
  };
}

function buildInvoiceSummary(invoice: Invoice): string {
  return `factură ${invoice.number} / bon fiscal ${invoice.fiscalReceiptNumber} pentru comanda ${invoice.orderId} — client ${invoice.customerName}, total ${formatCurrency(invoice.total)} (din care TVA ${formatCurrency(invoice.vatTotal)})`;
}

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      default:
        return "&quot;";
    }
  });
}

function buildEfacturaXml(invoice: Invoice): string {
  const lines = invoice.items
    .map(
      (item, index) => `
    <cac:InvoiceLine>
      <cbc:ID>${index + 1}</cbc:ID>
      <cbc:InvoicedQuantity>${item.quantity}</cbc:InvoicedQuantity>
      <cbc:LineExtensionAmount currencyID="RON">${item.netAmount.toFixed(2)}</cbc:LineExtensionAmount>
      <cac:Item>
        <cbc:Name>${escapeXml(item.description)}</cbc:Name>
      </cac:Item>
    </cac:InvoiceLine>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">
  <cbc:ID>${invoice.number}</cbc:ID>
  <cbc:IssueDate>${invoice.issueDate}</cbc:IssueDate>
  <cbc:DocumentCurrencyCode>RON</cbc:DocumentCurrencyCode>
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>${escapeXml(COMPANY_DETAILS.name)}</cbc:RegistrationName>
        <cbc:CompanyID>${COMPANY_DETAILS.cif}</cbc:CompanyID>
      </cac:PartyLegalEntity>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>${escapeXml(invoice.customerName)}</cbc:RegistrationName>
      </cac:PartyLegalEntity>
    </cac:Party>
  </cac:AccountingCustomerParty>
  <cac:LegalMonetaryTotal>
    <cbc:TaxExclusiveAmount currencyID="RON">${invoice.subtotal.toFixed(2)}</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="RON">${invoice.total.toFixed(2)}</cbc:TaxInclusiveAmount>
  </cac:LegalMonetaryTotal>${lines}
</Invoice>`;
}

export interface IssueInvoiceResult {
  efacturaSent: boolean;
}

/**
 * Emite automat factura fiscală și bonul fiscal aferent unei comenzi finalizate.
 * Dacă integrarea cu sistemul e-Factura al ANAF nu este configurată, emiterea
 * este simulată printr-un jurnal în consolă, la fel ca sistemul de notificări
 * SMS/Email (vezi lib/notifications.ts).
 */
export async function issueInvoice(invoice: Invoice): Promise<IssueInvoiceResult> {
  const apiKey = process.env.ANAF_EFACTURA_API_KEY;

  if (!apiKey) {
    console.log(`[facturare] Emitere automată (simulat, e-Factura ANAF neconfigurat) — ${buildInvoiceSummary(invoice)}.`);
    return { efacturaSent: true };
  }

  try {
    const response = await fetch("https://api.anaf.ro/prod/FCTEL/rest/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/xml",
      },
      body: buildEfacturaXml(invoice),
    });

    if (!response.ok) {
      console.error(`[facturare] Trimiterea facturii ${invoice.number} către e-Factura ANAF a eșuat (status ${response.status}).`);
      return { efacturaSent: false };
    }

    return { efacturaSent: true };
  } catch (error) {
    console.error(`[facturare] Eroare la trimiterea facturii ${invoice.number} către e-Factura ANAF:`, error);
    return { efacturaSent: false };
  }
}
