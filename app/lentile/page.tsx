import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Lentile",
  description:
    "Lentile de contact zilnice și lunare, plus servicii complete de lentile optice: monofocale, progresive și anti-reflex.",
};

const highlights = [
  {
    title: "Lentile de Contact",
    description:
      "Lentile zilnice, lunare și multifocale de la branduri precum Johnson & Johnson și CooperVision.",
    icon: "👁️",
  },
  {
    title: "Lentile Optice",
    description:
      "Monofocale, progresive și cu tratament anti-reflex, montate personalizat pe rama aleasă.",
    icon: "🔍",
  },
];

const contactLenses = products.filter((p) => p.category === "Lentile de contact");

export default function LentilePage() {
  return (
    <div className="bg-white">
      <div className="container-padded py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Colecția de Lentile
          </p>
          <h1 className="section-heading mt-2">Lentile pentru o vedere clară</h1>
          <p className="mt-4 text-lg text-gray-600">
            De la lentile de contact zilnice, până la lentile optice
            progresive montate personalizat — vă ajutăm să găsiți soluția
            potrivită pentru nevoile dumneavoastră vizuale.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-200"
            >
              <span className="text-4xl">{item.icon}</span>
              <h2 className="mt-4 text-lg font-semibold text-gray-900">
                {item.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Lentile de Contact</h2>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {contactLenses.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Lentile Optice, la Comandă
          </h2>
          <p className="mt-2 text-gray-600">
            Montăm lentile optice monofocale, progresive și cu tratament
            anti-reflex direct pe rama aleasă, în cabinetul nostru din
            Cluj-Napoca.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li>• Lentile monofocale pentru miopie, hipermetropie sau astigmatism</li>
            <li>• Lentile progresive pentru corecția la orice distanță</li>
            <li>• Tratamente anti-reflex, anti-zgârieturi și de protecție UV</li>
          </ul>
        </div>

        <div className="mt-16 rounded-2xl bg-brand-700 px-8 py-10 text-center">
          <h2 className="text-2xl font-bold text-white">
            Aveți nevoie de o rețetă nouă?
          </h2>
          <p className="mt-2 text-brand-100">
            Programați o consultație gratuită cu optometriștii noștri pentru
            a afla ce lentile vi se potrivesc.
          </p>
          <Link href="/contact" className="btn-secondary mt-6 inline-flex">
            Programează o consultație
          </Link>
        </div>
      </div>
    </div>
  );
}
