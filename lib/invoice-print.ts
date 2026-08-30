import { COMPANY_DETAILS, type Invoice } from "./invoicing";

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

export function printInvoice(invoice: Invoice) {
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
