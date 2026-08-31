"use client";

import { useState, type FormEvent } from "react";
import {
  type Order,
  type OrderStatus,
  orderStatusLabels,
  orders,
} from "@/lib/admin-data";
import OrderPushNotifications from "@/components/OrderPushNotifications";

const trackedStatuses: OrderStatus[] = [
  "in_asteptare",
  "in_procesare",
  "expediata",
  "livrata",
];

function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

function findOrders(query: string): Order[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const byCode = orders.filter(
    (order) => order.id.toLowerCase() === trimmed.toLowerCase()
  );
  if (byCode.length > 0) return byCode;

  const digits = normalizePhone(trimmed);
  if (digits.length < 6) return [];

  return orders
    .filter((order) => normalizePhone(order.phone).endsWith(digits))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default function OrderTrackingLookup() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!query.trim()) {
      setError("Introduceți numărul de telefon sau codul comenzii.");
      setResults(null);
      return;
    }

    setError(null);
    setResults(findOrders(query));
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:items-start"
      >
        <div className="flex-1">
          <label htmlFor="tracking-query" className="sr-only">
            Telefon sau cod comandă
          </label>
          <input
            type="text"
            id="tracking-query"
            name="tracking-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ex: +40 745 123 456 sau CMD-1042"
            className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        <button type="submit" className="btn-primary sm:w-auto">
          Caută Comanda
        </button>
      </form>

      {results !== null && (
        <div className="mt-8">
          {results.length === 0 ? (
            <p className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-6 text-center text-gray-600">
              Nu am găsit nicio comandă pentru datele introduse. Verificați
              numărul de telefon sau codul comenzii ori{" "}
              <a href="/contact" className="font-medium text-brand-700 hover:underline">
                contactați-ne
              </a>
              .
            </p>
          ) : (
            <div className="space-y-6">
              {results.map((order) => (
                <OrderResultCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function OrderResultCard({ order }: { order: Order }) {
  const isCancelled = order.status === "anulata";
  const currentStepIndex = trackedStatuses.indexOf(order.status);

  return (
    <div className="rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex flex-col gap-2 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-500">Comandă</p>
          <p className="text-lg font-semibold text-gray-900">{order.id}</p>
        </div>
        <div className="sm:text-right">
          <p className="text-sm text-gray-500">Data comenzii</p>
          <p className="text-gray-900">{order.date}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">Produse</p>
          <p className="text-gray-900">{order.items.join(", ")}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-gray-900">{order.total} lei</p>
        </div>
      </div>

      <div className="mt-6">
        {isCancelled ? (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
            Comanda {order.id} a fost anulată. Pentru detalii, vă rugăm{" "}
            <a href="/contact" className="underline">
              contactați-ne
            </a>
            .
          </div>
        ) : (
          <ol className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {trackedStatuses.map((status, index) => {
              const isComplete = index <= currentStepIndex;
              return (
                <li key={status} className="flex flex-1 items-center gap-3">
                  <span
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                      isComplete
                        ? "bg-brand-700 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={`text-sm font-medium ${
                      isComplete ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {orderStatusLabels[status]}
                  </span>
                  {index < trackedStatuses.length - 1 && (
                    <span
                      className={`hidden h-0.5 flex-1 sm:block ${
                        index < currentStepIndex ? "bg-brand-700" : "bg-gray-100"
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </div>

      <div className="mt-6">
        <OrderPushNotifications orderId={order.id} />
      </div>
    </div>
  );
}
