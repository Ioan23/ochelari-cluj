"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Ce presupune o consultație la domiciliu?",
    answer:
      "Un optometrist certificat vine la dumneavoastră acasă cu echipamentul necesar pentru a efectua un control complet al vederii, a discuta despre nevoile dumneavoastră vizuale și a vă recomanda rame sau lentile potrivite.",
  },
  {
    question: "Cine poate beneficia de acest serviciu?",
    answer:
      "Consultațiile la domiciliu sunt ideale pentru persoane cu mobilitate redusă, vârstnici, familii cu copii mici sau oricine preferă confortul propriei locuințe în locul unei vizite la magazin.",
  },
  {
    question: "Ce zone acoperiți pentru consultațiile la domiciliu?",
    answer:
      "Oferim acest serviciu în Cluj-Napoca și în localitățile învecinate. Pentru a confirma disponibilitatea în zona dumneavoastră, vă rugăm să ne contactați telefonic sau prin formularul de mai jos.",
  },
  {
    question: "Cât costă o consultație la domiciliu?",
    answer:
      "Controlul de bază al vederii este gratuit, la fel ca la magazin. Poate fi aplicată o taxă de deplasare în funcție de distanță, pe care v-o comunicăm în momentul programării.",
  },
  {
    question: "Cum programez o consultație la domiciliu?",
    answer:
      "Ne puteți contacta telefonic la +40 264 123 456 sau prin formularul de contact, menționând că doriți o consultație la domiciliu. Vă vom propune o dată și un interval orar convenabile.",
  },
  {
    question: "Cât durează o vizită la domiciliu?",
    answer:
      "O consultație standard durează aproximativ 30-45 de minute și include controlul vederii, măsurători pentru rame și recomandări personalizate.",
  },
];

export default function HomeConsultationFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <h2 className="text-2xl font-bold text-gray-900">
        Întrebări Frecvente despre Consultațiile la Domiciliu
      </h2>
      <p className="mt-2 text-base text-gray-600">
        Răspunsuri la cele mai comune întrebări despre serviciul nostru de
        consultații optice la domiciliu.
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
                  aria-controls={`faq-answer-${index}`}
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
                  id={`faq-answer-${index}`}
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
