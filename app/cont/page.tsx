"use client";

import Link from "next/link";
import { usePrescriptions } from "@/lib/prescriptions-context";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ContPage() {
  const { savedPrescriptions, removePrescription } = usePrescriptions();

  if (savedPrescriptions.length === 0) {
    return (
      <div className="bg-white">
        <div className="container-padded py-24 text-center">
          <h1 className="section-heading">Contul Meu</h1>
          <p className="mt-4 text-lg text-gray-600">
            Nu ai nicio rețetă salvată încă. Încarcă o rețetă și bifează
            &bdquo;Salvează această rețetă în contul meu&rdquo; pentru a o
            regăsi aici la comenzile viitoare.
          </p>
          <Link href="/incarca-reteta" className="btn-primary mt-8 inline-flex">
            Încarcă o rețetă
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container-padded py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h1 className="section-heading">Contul Meu</h1>
            <p className="mt-2 text-gray-600">
              Rețetele optometrice salvate pe acest dispozitiv.
            </p>
          </div>
          <Link href="/incarca-reteta" className="btn-secondary text-sm">
            Încarcă o rețetă nouă
          </Link>
        </div>

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
      </div>
    </div>
  );
}
