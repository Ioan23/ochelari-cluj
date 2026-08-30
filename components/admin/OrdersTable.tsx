"use client";

import { useMemo, useState } from "react";
import {
  type Order,
  type OrderStatus,
  orderStatusLabels,
  orderStatusStyles,
  orders as initialOrders,
} from "@/lib/admin-data";

const statusFilters: Array<OrderStatus | "toate"> = [
  "toate",
  "in_asteptare",
  "in_procesare",
  "expediata",
  "livrata",
  "anulata",
];

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "toate">(
    "toate"
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "toate" || order.status === statusFilter;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        order.customerName.toLowerCase().includes(query) ||
        order.id.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [orders, search, statusFilter]);

  function handleStatusChange(orderId: string, status: OrderStatus) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
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
          placeholder="Caută după nume sau nr. comandă..."
          className="w-full max-w-sm rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
        />
        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as OrderStatus | "toate")
          }
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
        >
          {statusFilters.map((status) => (
            <option key={status} value={status}>
              {status === "toate" ? "Toate statusurile" : orderStatusLabels[status]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Comandă
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Client
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Produse
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Total
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
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-4 py-3">
                  <div className="text-gray-900">{order.customerName}</div>
                  <div className="text-xs text-gray-500">{order.email}</div>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {order.items.join(", ")}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-900">
                  {order.total} lei
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                  {order.date}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(event) =>
                      handleStatusChange(
                        order.id,
                        event.target.value as OrderStatus
                      )
                    }
                    className={`rounded-full border-0 px-3 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-700 ${orderStatusStyles[order.status]}`}
                  >
                    {Object.entries(orderStatusLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  Nu există comenzi care să corespundă filtrelor selectate.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
