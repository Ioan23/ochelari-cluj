export interface ExportColumn<T> {
  header: string;
  accessor: (row: T) => string | number;
}

function toCellText(value: string | number): string {
  return typeof value === "number" ? String(value) : value;
}

function escapeCsvCell(value: string): string {
  if (/[",\r\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function escapeHtmlCell(value: string): string {
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

export function toCsv<T>(rows: T[], columns: Array<ExportColumn<T>>): string {
  const header = columns.map((column) => escapeCsvCell(column.header)).join(",");
  const body = rows.map((row) =>
    columns
      .map((column) => escapeCsvCell(toCellText(column.accessor(row))))
      .join(",")
  );
  return [header, ...body].join("\r\n");
}

export function toExcelHtml<T>(rows: T[], columns: Array<ExportColumn<T>>): string {
  const headerRow = columns
    .map((column) => `<th>${escapeHtmlCell(column.header)}</th>`)
    .join("");
  const bodyRows = rows
    .map((row) => {
      const cells = columns
        .map(
          (column) =>
            `<td>${escapeHtmlCell(toCellText(column.accessor(row)))}</td>`
        )
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  return `<!DOCTYPE html><html><head><meta charset="UTF-8" /></head><body><table><thead><tr>${headerRow}</tr></thead><tbody>${bodyRows}</tbody></table></body></html>`;
}

function downloadBlob(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const UTF8_BOM = "﻿";

export function downloadCsv<T>(
  rows: T[],
  columns: Array<ExportColumn<T>>,
  filename: string
): void {
  downloadBlob(
    UTF8_BOM + toCsv(rows, columns),
    filename,
    "text/csv;charset=utf-8;"
  );
}

export function downloadExcel<T>(
  rows: T[],
  columns: Array<ExportColumn<T>>,
  filename: string
): void {
  downloadBlob(
    toExcelHtml(rows, columns),
    filename,
    "application/vnd.ms-excel;charset=utf-8;"
  );
}
