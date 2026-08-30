"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Cât timp am la dispoziție pentru a returna un produs?",
    answer:
      "Aveți la dispoziție 14 zile calendaristice de la data primirii comenzii pentru a returna produsul, conform legislației privind protecția consumatorilor pentru achizițiile online.",
  },
  {
    question: "Rama sau lentilele mele pot fi returnate dacă au fost personalizate?",
    answer:
      "Lentilele confecționate pe baza rețetei dumneavoastră medicale sunt produse personalizate și nu pot fi returnate decât în cazul unui defect de fabricație sau al unei erori din partea noastră.",
  },
  {
    question: "Ce se întâmplă dacă primesc un produs defect?",
    answer:
      "Dacă produsul prezintă un defect de fabricație, îl înlocuim sau îl reparăm gratuit în perioada de garanție. Contactați-ne cu numărul comenzii și o descriere sau fotografie a defectului.",
  },
  {
    question: "Cine suportă costurile de transport pentru retur?",
    answer:
      "Dacă returul se datorează unui defect sau unei erori de livrare, suportăm noi costul transportului. În cazul unui retur din alte motive, costul transportului revine clientului.",
  },
  {
    question: "Cât durează procesarea rambursării?",
    answer:
      "După ce primim și verificăm produsul returnat, rambursarea se procesează în maximum 14 zile calendaristice, folosind aceeași metodă de plată utilizată la achiziție.",
  },
  {
    question: "Garanția acoperă și zgârieturile de pe lentile?",
    answer:
      "Garanția acoperă defectele de fabricație, nu uzura normală sau deteriorările accidentale precum zgârieturile provocate de utilizare. Pentru astfel de situații vă putem oferi soluții de înlocuire contra cost preferențial.",
  },
];

export default function WarrantyReturnFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <h2 className="text-2xl font-bold text-gray-900">
        Întrebări Frecvente despre Garanție și Retur
      </h2>
      <p className="mt-2 text-base text-gray-600">
        Răspunsuri la cele mai comune întrebări legate de garanția produselor
        și politica noastră de retur.
      </p>

      <dl className="mt-8 space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className="rounded-lg border border-gray-200"
            >
              <dt>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`warranty-faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-base font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-brand-700 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </dt>
              {isOpen && (
                <dd
                  id={`warranty-faq-answer-${index}`}
                  className="px-5 pb-4 text-sm leading-6 text-gray-600"
                >
                  {faq.answer}
                </dd>
              )}
            </div>
          );
        })}
      </dl>
    </section>
  );
}
