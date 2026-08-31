"use client";

import { useMemo, useState } from "react";
import ExportButtons from "@/components/admin/ExportButtons";
import {
  type Client,
  type ClientStatus,
  clientStatusLabels,
  clientStatusStyles,
  clients as initialClients,
} from "@/lib/clients-data";
import type { ExportColumn } from "@/lib/export";

const clientExportColumns: Array<ExportColumn<Client>> = [
  { header: "Nr. client", accessor: (client) => client.id },
  { header: "Nume", accessor: (client) => client.name },
  { header: "Email", accessor: (client) => client.email },
  { header: "Telefon", accessor: (client) => client.phone },
  { header: "Membru din", accessor: (client) => client.joinDate },
  { header: "Ultima vizită", accessor: (client) => client.lastVisit },
  { header: "Comenzi", accessor: (client) => client.totalOrders },
  { header: "Total cheltuit (lei)", accessor: (client) => client.totalSpent },
  {
    header: "Categorie",
    accessor: (client) => clientStatusLabels[client.status],
  },
];

const statusFilters: Array<ClientStatus | "toate"> = [
  "toate",
  "activ",
  "vip",
  "inactiv",
];

export default function ClientsTable() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClientStatus | "toate">(
    "toate"
  );

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesStatus =
        statusFilter === "toate" || client.status === statusFilter;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        client.id.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [clients, search, statusFilter]);

  function handleStatusChange(clientId: string, status: ClientStatus) {
    setClients((prev) =>
      prev.map((client) =>
        client.id === clientId ? { ...client, status } : client
      )
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Caută după nume, email sau nr. client..."
            className="w-full max-w-sm rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
          />
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as ClientStatus | "toate")
            }
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
          >
            {statusFilters.map((status) => (
              <option key={status} value={status}>
                {status === "toate" ? "Toate categoriile" : clientStatusLabels[status]}
              </option>
            ))}
          </select>
        </div>
        <ExportButtons
          rows={filteredClients}
          columns={clientExportColumns}
          filenamePrefix="clienti"
        />
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Client
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Contact
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Membru din
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Ultima vizită
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Comenzi
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Total cheltuit
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Categorie
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredClients.map((client) => (
              <tr key={client.id}>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="font-medium text-gray-900">
                    {client.name}
                  </div>
                  <div className="text-xs text-gray-500">{client.id}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-gray-900">{client.email}</div>
                  <div className="text-xs text-gray-500">{client.phone}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                  {client.joinDate}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                  {client.lastVisit}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-900">
                  {client.totalOrders}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-900">
                  {client.totalSpent} lei
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <select
                    value={client.status}
                    onChange={(event) =>
                      handleStatusChange(
                        client.id,
                        event.target.value as ClientStatus
                      )
                    }
                    className={`rounded-full border-0 px-3 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-700 ${clientStatusStyles[client.status]}`}
                  >
                    {Object.entries(clientStatusLabels).map(
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
            {filteredClients.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  Nu există clienți care să corespundă filtrelor selectate.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
