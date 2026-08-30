"use client";

import { useState } from "react";
import type { FormEvent } from "react";

const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

interface NotificationStatus {
  emailSent: boolean;
  smsSent: boolean;
}

export default function HomeAppointmentBooking() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<NotificationStatus | null>(
    null
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      customerName: formData.get("customerName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      date: formData.get("date"),
      time: formData.get("time"),
      notes: formData.get("notes"),
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data) {
        setError(
          data?.error ?? "Nu am putut trimite programarea. Încearcă din nou."
        );
        return;
      }

      setConfirmation(data.notifications as NotificationStatus);
    } catch {
      setError("Nu am putut trimite programarea. Verifică conexiunea și încearcă din nou.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmation) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-7 w-7 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-xl font-semibold text-gray-900">
          Programarea a fost trimisă!
        </h2>
        <p className="mt-2 text-gray-600">
          {confirmation.emailSent && confirmation.smsSent
            ? "Vei primi în scurt timp un email și un SMS de confirmare cu detaliile vizitei."
            : confirmation.emailSent
              ? "Ți-am trimis un email de confirmare. Nu am putut trimite SMS-ul, dar te vom contacta telefonic."
              : confirmation.smsSent
                ? "Ți-am trimis un SMS de confirmare. Nu am putut trimite emailul, dar îți vom scrie în curând."
                : "Am înregistrat programarea. Te vom contacta pentru confirmare."}
        </p>
        <button
          type="button"
          onClick={() => setConfirmation(null)}
          className="btn-secondary mt-8"
        >
          Fă o altă programare
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="apptCustomerName"
            className="block text-sm font-medium text-gray-700"
          >
            Nume complet
          </label>
          <input
            type="text"
            id="apptCustomerName"
            name="customerName"
            required
            autoComplete="name"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            placeholder="Numele dvs."
          />
        </div>
        <div>
          <label
            htmlFor="apptPhone"
            className="block text-sm font-medium text-gray-700"
          >
            Telefon
          </label>
          <input
            type="tel"
            id="apptPhone"
            name="phone"
            required
            autoComplete="tel"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            placeholder="07xx xxx xxx"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="apptEmail"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="apptEmail"
            name="email"
            required
            autoComplete="email"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            placeholder="email@exemplu.ro"
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="apptAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Adresă
          </label>
          <input
            type="text"
            id="apptAddress"
            name="address"
            required
            autoComplete="street-address"
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            placeholder="Strada, numărul, orașul"
          />
        </div>
        <div>
          <label
            htmlFor="apptDate"
            className="block text-sm font-medium text-gray-700"
          >
            Data dorită
          </label>
          <input
            type="date"
            id="apptDate"
            name="date"
            required
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
          />
        </div>
        <div>
          <label
            htmlFor="apptTime"
            className="block text-sm font-medium text-gray-700"
          >
            Interval orar
          </label>
          <select
            id="apptTime"
            name="time"
            required
            defaultValue=""
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
          >
            <option value="" disabled>
              Alege ora
            </option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="apptNotes"
            className="block text-sm font-medium text-gray-700"
          >
            Observații (opțional)
          </label>
          <textarea
            id="apptNotes"
            name="notes"
            rows={4}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
            placeholder="Menționează orice detaliu util pentru vizită."
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <p className="text-xs text-gray-500">
        Vei primi o confirmare prin SMS și email după trimiterea formularului.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Se trimite..." : "Programează Consultația"}
      </button>
    </form>
  );
}
