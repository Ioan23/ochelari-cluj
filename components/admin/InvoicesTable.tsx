"use client";

import { Fragment, useMemo, useState } from "react";
import { invoices as initialInvoices } from "@/lib/admin-data";
import {
  COMPANY_DETAILS,
  formatCurrency,
  type Invoice,
  type InvoiceStatus,
} from "@/lib/invoicing";

const statusLabels: Record<InvoiceStatus, string> = {
  emisa: "Emisă",
  stornata: "Stornată",
};

const statusStyles: Record<InvoiceStatus, string> = {
  emisa: "bg-green-100 text-green-800",
  stornata: "bg-red-100 text-red-800",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

function printInvoice(invoice: Invoice) {
  const printWindow = window.open("", "_blank", "width=800,height=1000");
  if (!printWindow) return;

  const rows = invoice.items
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.description)}</td>
          <td style="text-align:center">${item.quantity}</td>
          <td style="text-align:right">${item.unitPriceNet.toFixed(2)}</td>
          <td style="text-align:right">${item.netAmount.toFixed(2)}</td>
          <td style="text-align:right">${item.vatAmount.toFixed(2)}</td>
          <td style="text-align:right">${item.grossAmount.toFixed(2)}</td>
        </tr>`
    )
    .join("");

  printWindow.document.write(`<!DOCTYPE html>
<html lang="ro">
  <head>
    <meta charset="utf-8" />
    <title>Factura ${escapeHtml(invoice.number)}</title>
    <style>
      body { font-family: Arial, Helvetica, sans-serif; padding: 32px; color: #111827; }
      h1 { font-size: 20px; margin: 0 0 4px; }
      .muted { color: #4b5563; font-size: 13px; margin: 4px 0; }
      table { width: 100%; border-collapse: collapse; margin-top: 24px; }
      th, td { border: 1px solid #d1d5db; padding: 8px; font-size: 13px; }
      th { background: #f3f4f6; text-align: left; }
      .totals { margin-top: 16px; width: 280px; margin-left: auto; }
      .totals div { display: flex; justify-content: space-between; padding: 4px 0; font-size: 13px; }
      .totals .grand { font-weight: 700; border-top: 1px solid #111827; margin-top: 4px; padding-top: 8px; font-size: 15px; }
      @media print { body { padding: 0; } }
    </style>
  </head>
  <body>
    <h1>Factură fiscală ${escapeHtml(invoice.number)}</h1>
    <p class="muted">Bon fiscal: ${escapeHtml(invoice.fiscalReceiptNumber)} &middot; Comandă: ${escapeHtml(invoice.orderId)} &middot; Data: ${escapeHtml(invoice.issueDate)}</p>
    <p class="muted">${escapeHtml(COMPANY_DETAILS.name)} &middot; CIF ${escapeHtml(COMPANY_DETAILS.cif)} &middot; Reg. Com. ${escapeHtml(COMPANY_DETAILS.regCom)}<br />${escapeHtml(COMPANY_DETAILS.address)}</p>
    <p class="muted"><strong>Client:</strong> ${escapeHtml(invoice.customerName)} (${escapeHtml(invoice.customerEmail)})</p>
    <table>
      <thead>
        <tr>
          <th>Produs / Serviciu</th>
          <th>Cant.</th>
          <th>Preț unitar (fără TVA)</th>
          <th>Valoare (fără TVA)</th>
          <th>TVA (19%)</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="totals">
      <div><span>Subtotal (fără TVA)</span><span>${invoice.subtotal.toFixed(2)} lei</span></div>
      <div><span>TVA (19%)</span><span>${invoice.vatTotal.toFixed(2)} lei</span></div>
      <div class="grand"><span>Total de plată</span><span>${invoice.total.toFixed(2)} lei</span></div>
    </div>
  </body>
</html>`);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

export default function InvoicesTable() {
  const [invoices] = useState<Invoice[]>(initialInvoices);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredInvoices = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return invoices;
    return invoices.filter(
      (invoice) =>
        invoice.number.toLowerCase().includes(query) ||
        invoice.fiscalReceiptNumber.toLowerCase().includes(query) ||
        invoice.orderId.toLowerCase().includes(query) ||
        invoice.customerName.toLowerCase().includes(query)
    );
  }, [invoices, search]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Caută după nr. factură, bon fiscal, comandă sau client..."
          className="w-full max-w-sm rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
        />
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Factură</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Bon fiscal</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Comandă</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Client</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Total (TVA inclus)</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Data</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Acțiuni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredInvoices.map((invoice) => (
              <Fragment key={invoice.id}>
                <tr>
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                    {invoice.number}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">
                    {invoice.fiscalReceiptNumber}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-700">{invoice.orderId}</td>
                  <td className="px-4 py-3">
                    <div className="text-gray-900">{invoice.customerName}</div>
                    <div className="text-xs text-gray-500">{invoice.customerEmail}</div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-900">
                    {formatCurrency(invoice.total)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                    {invoice.issueDate}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[invoice.status]}`}
                    >
                      {statusLabels[invoice.status]}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId((current) => (current === invoice.id ? null : invoice.id))
                        }
                        className="text-xs font-semibold text-brand-700 hover:text-brand-800"
                      >
                        {expandedId === invoice.id ? "Ascunde" : "Detalii"}
                      </button>
                      <button
                        type="button"
                        onClick={() => printInvoice(invoice)}
                        className="text-xs font-semibold text-brand-700 hover:text-brand-800"
                      >
                        Printează
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedId === invoice.id && (
                  <tr>
                    <td colSpan={8} className="bg-gray-50 px-4 py-4">
                      <table className="min-w-full text-xs">
                        <thead>
                          <tr className="text-gray-500">
                            <th className="px-2 py-1 text-left">Produs / Serviciu</th>
                            <th className="px-2 py-1 text-right">Cant.</th>
                            <th className="px-2 py-1 text-right">Preț unitar (fără TVA)</th>
                            <th className="px-2 py-1 text-right">Valoare (fără TVA)</th>
                            <th className="px-2 py-1 text-right">TVA (19%)</th>
                            <th className="px-2 py-1 text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-700">
                          {invoice.items.map((item, index) => (
                            <tr key={index}>
                              <td className="px-2 py-1">{item.description}</td>
                              <td className="px-2 py-1 text-right">{item.quantity}</td>
                              <td className="px-2 py-1 text-right">{item.unitPriceNet.toFixed(2)}</td>
                              <td className="px-2 py-1 text-right">{item.netAmount.toFixed(2)}</td>
                              <td className="px-2 py-1 text-right">{item.vatAmount.toFixed(2)}</td>
                              <td className="px-2 py-1 text-right">{item.grossAmount.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mt-3 flex justify-end gap-6 text-xs text-gray-700">
                        <span>Subtotal: {formatCurrency(invoice.subtotal)}</span>
                        <span>TVA: {formatCurrency(invoice.vatTotal)}</span>
                        <span className="font-semibold">Total: {formatCurrency(invoice.total)}</span>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
            {filteredInvoices.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                  Nu există facturi care să corespundă căutării.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
