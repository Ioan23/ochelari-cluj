"use client";

import { useMemo, useState } from "react";
import {
  type Prescription,
  type PrescriptionStatus,
  prescriptionStatusLabels,
  prescriptionStatusStyles,
  prescriptions as initialPrescriptions,
} from "@/lib/admin-data";

const statusFilters: Array<PrescriptionStatus | "toate"> = [
  "toate",
  "noua",
  "in_verificare",
  "procesata",
  "respinsa",
];

export default function PrescriptionsTable() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(
    initialPrescriptions
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    PrescriptionStatus | "toate"
  >("toate");

  const filteredPrescriptions = useMemo(() => {
    return prescriptions.filter((prescription) => {
      const matchesStatus =
        statusFilter === "toate" || prescription.status === statusFilter;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        prescription.customerName.toLowerCase().includes(query) ||
        prescription.id.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [prescriptions, search, statusFilter]);

  function handleStatusChange(
    prescriptionId: string,
    status: PrescriptionStatus
  ) {
    setPrescriptions((prev) =>
      prev.map((prescription) =>
        prescription.id === prescriptionId
          ? { ...prescription, status }
          : prescription
      )
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Caută după nume sau nr. rețetă..."
          className="w-full max-w-sm rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
        />
        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as PrescriptionStatus | "toate")
          }
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
        >
          {statusFilters.map((status) => (
            <option key={status} value={status}>
              {status === "toate"
                ? "Toate statusurile"
                : prescriptionStatusLabels[status]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Rețetă
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Client
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Fișier
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Note
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Data
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredPrescriptions.map((prescription) => (
              <tr key={prescription.id}>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                  {prescription.id}
                </td>
                <td className="px-4 py-3">
                  <div className="text-gray-900">
                    {prescription.customerName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {prescription.email}
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  <span className="mr-1">
                    {prescription.fileType === "pdf" ? "📄" : "🖼️"}
                  </span>
                  {prescription.fileName}
                </td>
                <td className="px-4 py-3 max-w-xs text-gray-500">
                  {prescription.notes || "—"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                  {prescription.date}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <select
                    value={prescription.status}
                    onChange={(event) =>
                      handleStatusChange(
                        prescription.id,
                        event.target.value as PrescriptionStatus
                      )
                    }
                    className={`rounded-full border-0 px-3 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-700 ${prescriptionStatusStyles[prescription.status]}`}
                  >
                    {Object.entries(prescriptionStatusLabels).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                </td>
              </tr>
            ))}
            {filteredPrescriptions.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  Nu există rețete care să corespundă filtrelor selectate.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
