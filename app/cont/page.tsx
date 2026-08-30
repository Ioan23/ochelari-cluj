"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { usePrescriptions } from "@/lib/prescriptions-context";
import {
  getInvoicesByEmail,
  getOrdersByEmail,
  orderStatusLabels,
  orderStatusStyles,
  type Order,
} from "@/lib/admin-data";
import { formatCurrency, type Invoice } from "@/lib/invoicing";
import { printInvoice } from "@/lib/invoice-print";

const EMAIL_STORAGE_KEY = "ochelari-cluj-account-email";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function OrderHistorySection() {
  const [emailInput, setEmailInput] = useState("");
  const [searchedEmail, setSearchedEmail] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  function runSearch(email: string) {
    const trimmed = email.trim();
    setSearchedEmail(trimmed);
    setOrders(getOrdersByEmail(trimmed));
    setInvoices(getInvoicesByEmail(trimmed));
  }

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(EMAIL_STORAGE_KEY);
      if (stored) {
        setEmailInput(stored);
        runSearch(stored);
      }
    } catch {
      // Ignore inaccessible storage and let the user search manually.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = emailInput.trim();
    runSearch(trimmed);
    try {
      if (trimmed) {
        window.localStorage.setItem(EMAIL_STORAGE_KEY, trimmed);
      } else {
        window.localStorage.removeItem(EMAIL_STORAGE_KEY);
      }
    } catch {
      // Ignore storage write failures (e.g. private browsing quota).
    }
  }

  return (
    <div className="mb-16">
      <h2 className="text-xl font-semibold text-gray-900">
        Istoric comenzi și facturi
      </h2>
      <p className="mt-2 text-gray-600">
        Introduceți adresa de e-mail folosită la comandă pentru acces rapid la
        comenzile și facturile dumneavoastră.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <input
          type="email"
          required
          value={emailInput}
          onChange={(event) => setEmailInput(event.target.value)}
          placeholder="adresa@exemplu.ro"
          className="w-full max-w-sm rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
        />
        <button type="submit" className="btn-primary text-sm">
          Caută comenzile mele
        </button>
      </form>

      {searchedEmail !== null && (
        <div className="mt-8">
          {orders.length === 0 ? (
            <p className="text-gray-600">
              Nu am găsit nicio comandă pentru adresa {searchedEmail}.
            </p>
          ) : (
            <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200">
              {orders.map((order) => {
                const invoice = invoices.find(
                  (item) => item.orderId === order.id
                );
                return (
                  <li key={order.id} className="flex flex-col gap-4 p-4 sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          Comandă {order.id}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {formatDate(order.date)} &middot; {order.items.join(", ")}
                        </p>
                      </div>
                      <div className="flex flex-col items-start gap-2 sm:items-end">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${orderStatusStyles[order.status]}`}
                        >
                          {orderStatusLabels[order.status]}
                        </span>
                        <span className="font-semibold text-gray-900">
                          {order.total} lei
                        </span>
                      </div>
                    </div>

                    {invoice && (
                      <div className="flex flex-col gap-2 rounded-lg bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-gray-700">
                          Factură {invoice.number} &middot; Bon fiscal{" "}
                          {invoice.fiscalReceiptNumber} &middot; Total{" "}
                          {formatCurrency(invoice.total)}
                        </p>
                        <button
                          type="button"
                          onClick={() => printInvoice(invoice)}
                          className="self-start text-sm font-semibold text-brand-700 hover:text-brand-800 sm:self-center"
                        >
                          Printează factura
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default function ContPage() {
  const { savedPrescriptions, removePrescription } = usePrescriptions();

  return (
    <div className="bg-white">
      <div className="container-padded py-16">
        <h1 className="section-heading">Contul Meu</h1>

        <div className="mt-10">
          <OrderHistorySection />

          <div>
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Rețete salvate
                </h2>
                <p className="mt-2 text-gray-600">
                  Rețetele optometrice salvate pe acest dispozitiv.
                </p>
              </div>
              <Link href="/incarca-reteta" className="btn-secondary text-sm">
                Încarcă o rețetă nouă
              </Link>
            </div>

            {savedPrescriptions.length === 0 ? (
              <p className="text-gray-600">
                Nu ai nicio rețetă salvată încă. Încarcă o rețetă și bifează
                &bdquo;Salvează această rețetă în contul meu&rdquo; pentru a o
                regăsi aici la comenzile viitoare.
              </p>
            ) : (
              <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200">
                {savedPrescriptions.map((prescription) => (
                  <li
                    key={prescription.id}
                    className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{prescription.fileName}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          Salvată pe {formatDate(prescription.savedAt)}
                        </p>
                        {prescription.notes && (
                          <p className="mt-1 text-sm text-gray-600">{prescription.notes}</p>
                        )}
                        <span className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                          {prescription.fileType === "pdf" ? "PDF" : "Imagine"}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removePrescription(prescription.id)}
                      className="self-start rounded-md p-2 text-gray-400 hover:bg-gray-50 hover:text-red-600 sm:self-center"
                      aria-label="Șterge rețeta salvată"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
