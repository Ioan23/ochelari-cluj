import type { Metadata } from "next";
import Link from "next/link";
import WarrantyReturnFAQ from "@/components/WarrantyReturnFAQ";

export const metadata: Metadata = {
  title: "Garanție și Retur",
  description:
    "Aflați detalii despre garanția oferită pentru rame și lentile, precum și despre politica noastră de retur.",
};

const warrantyItems = [
  {
    title: "Rame Optice și Ochelari de Soare",
    period: "24 de luni",
    desc: "Garanție pentru defecte de fabricație ale ramelor: balamale, materiale sau finisaje. Garanția nu acoperă deteriorările accidentale sau uzura normală.",
  },
  {
    title: "Lentile de Vedere",
    period: "24 de luni",
    desc: "Garanție pentru defecte de fabricație ale lentilelor: delaminare, defecte ale tratamentelor sau ale stratului antireflex. Zgârieturile provocate de utilizare nu sunt acoperite.",
  },
  {
    title: "Lentile de Contact",
    period: "conform producătorului",
    desc: "Produsele sigilate beneficiază de garanția oferită de producător. În cazul unui produs deteriorat sau expirat la livrare, îl înlocuim gratuit.",
  },
];

const returnSteps = [
  {
    step: "1",
    title: "Contactați-ne",
    desc: "Scrieți-ne la contact@ochelaricluj.ro sau sunați la +40 264 123 456, menționând numărul comenzii și motivul returului.",
  },
  {
    step: "2",
    title: "Pregătiți produsul",
    desc: "Ambalați produsul în starea inițială, cu toate accesoriile și eticheta primite, în perioada de 14 zile de la primire.",
  },
  {
    step: "3",
    title: "Trimiteți coletul",
    desc: "Trimiteți produsul la adresa noastră sau, la cerere, organizăm ridicarea prin curier.",
  },
  {
    step: "4",
    title: "Primiți rambursarea",
    desc: "După verificarea produsului, procesăm rambursarea în maximum 14 zile, prin aceeași metodă de plată folosită la achiziție.",
  },
];

export default function GarantieReturPage() {
  return (
    <div className="bg-white">
      <div className="container-padded py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="section-heading">Garanție și Politică de Retur</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Ne dorim să fiți pe deplin mulțumiți de rama și lentilele
            dumneavoastră. Mai jos găsiți toate detaliile despre garanția
            oferită și despre modul în care puteți returna un produs.
          </p>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">Garanție</h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Toate produsele achiziționate de la Ochelari Cluj beneficiază de
              garanție împotriva defectelor de fabricație, conform legislației
              în vigoare privind protecția consumatorilor.
            </p>
            <ul className="mt-6 space-y-4">
              {warrantyItems.map((item) => (
                <li
                  key={item.title}
                  className="rounded-lg border border-gray-200 p-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-semibold text-gray-900">
                      {item.title}
                    </span>
                    <span className="text-sm font-medium text-brand-700">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Politica de Retur
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Aveți dreptul de a returna produsele comandate online în termen
              de 14 zile calendaristice de la primire, fără a fi nevoie să
              justificați decizia, conform OUG 34/2014 privind drepturile
              consumatorilor.
            </p>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Lentilele confecționate pe baza unei rețete medicale
              individuale sunt produse personalizate și pot fi returnate doar
              în cazul unui defect de fabricație sau al unei erori de
              procesare din partea noastră.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Cum se face returul
            </h2>
            <ol className="mt-6 space-y-6">
              {returnSteps.map((item) => (
                <li key={item.step} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
                    {item.step}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-12 rounded-lg bg-gray-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Aveți întrebări despre garanție sau retur?
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Echipa noastră vă stă la dispoziție pentru orice nelămurire.
            </p>
            <Link href="/contact" className="btn-primary mt-4 text-sm">
              Contactați-ne
            </Link>
          </div>

          <WarrantyReturnFAQ />
        </div>
      </div>
    </div>
  );
}
