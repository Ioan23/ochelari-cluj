import type { Metadata } from "next";
import ClinicPartners from "@/components/ClinicPartners";

export const metadata: Metadata = {
  title: "Despre Noi | Optică în Cluj-Napoca din 2010",
  description:
    "Aflați mai multe despre echipa Ochelari Cluj, magazinul nostru de optică din Cluj-Napoca, și misiunea noastră de a oferi cele mai bune servicii optice locuitorilor Clujului.",
  alternates: {
    canonical: "/despre",
  },
};

export default function DesprePage() {
  return (
    <div className="bg-white">
      <div className="container-padded py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="section-heading">Despre Noi</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Ochelari Cluj este magazinul de optică premium din inima Clujului,
            dedicat să vă ofere cele mai bune soluții pentru sănătatea ochilor
            și stilul dumneavoastră personal.
          </p>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">Povestea Noastră</h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Fondată în 2010, Ochelari Cluj a pornit de la o viziune simplă: să
              aducem servicii optice de calitate superioară locuitorilor
              Clujului. De-a lungul anilor, am crescut de la un mic cabinet
              optic la un magazin complet, oferind o gamă largă de rame de
              designer, lentile premium și lentile de contact.
            </p>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Echipa noastră de optometristi și optici experiemntați vă stă la
              dispoziție pentru a vă oferi consultanță personalizată și soluții
              adaptate nevoilor dumneavoastră vizuale.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900">Valorile Noastre</h2>
            <ul className="mt-6 space-y-4">
              {[
                {
                  title: "Calitate",
                  desc: "Lucrăm doar cu mărci de top și materiale premium.",
                },
                {
                  title: "Expertiză",
                  desc: "Echipa noastră este pregătită și certificată profesional.",
                },
                {
                  title: "Personalizare",
                  desc: "Fiecare client primește atenție individualizată.",
                },
                {
                  title: "Accesibilitate",
                  desc: "Oferim soluții pentru toate bugetele, fără compromisuri la calitate.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-1 flex-shrink-0 text-brand-700">✓</span>
                  <div>
                    <span className="font-semibold text-gray-900">
                      {item.title}:{" "}
                    </span>
                    <span className="text-gray-600">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: "15+", label: "Ani de experiență" },
              { value: "5000+", label: "Clienți mulțumiți" },
              { value: "200+", label: "Modele de rame" },
              { value: "4", label: "Specialiști certificați" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-brand-700">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          <ClinicPartners />
        </div>
      </div>
    </div>
  );
}
