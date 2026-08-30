"use client";

import dynamic from "next/dynamic";

const CoverageMap = dynamic(() => import("@/components/CoverageMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-96 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-500">
      Se încarcă harta...
    </div>
  ),
});

export default function CoverageMapSection() {
  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <h2 className="text-2xl font-bold text-gray-900">
        Zona de Acoperire pentru Deplasări la Domiciliu
      </h2>
      <p className="mt-2 text-base text-gray-600">
        Explorați harta interactivă pentru a vedea dacă adresa dumneavoastră
        se află în zona cu deplasare gratuită în Cluj-Napoca.
      </p>

      <div className="mt-8">
        <CoverageMap />
      </div>
    </section>
  );
}
