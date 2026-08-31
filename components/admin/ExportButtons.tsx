"use client";

import { downloadCsv, downloadExcel, type ExportColumn } from "@/lib/export";

interface ExportButtonsProps<T> {
  rows: T[];
  columns: Array<ExportColumn<T>>;
  filenamePrefix: string;
}

export default function ExportButtons<T>({
  rows,
  columns,
  filenamePrefix,
}: ExportButtonsProps<T>) {
  const isDisabled = rows.length === 0;

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={isDisabled}
        onClick={() => downloadCsv(rows, columns, `${filenamePrefix}.csv`)}
        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Exportă CSV
      </button>
      <button
        type="button"
        disabled={isDisabled}
        onClick={() => downloadExcel(rows, columns, `${filenamePrefix}.xls`)}
        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Exportă Excel
      </button>
    </div>
  );
}
