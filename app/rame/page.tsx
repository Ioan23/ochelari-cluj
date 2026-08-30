import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Rame Ochelari și Ochelari de Soare în Cluj-Napoca",
  description:
    "Descoperiți colecția noastră de rame optice și ochelari de soare din magazinul de optică din Cluj-Napoca, de la clasice la cele mai noi tendințe.",
  alternates: {
    canonical: "/rame",
  },
};

const highlights = [
  {
    title: "Rame Optice",
    description:
      "Modele pentru fiecare formă de față, din acetat, titan sau metal ușor, gândite pentru confort pe tot parcursul zilei.",
    icon: "👓",
  },
  {
    title: "Ochelari de Soare",
    description:
      "Protecție UV400 completă, combinată cu design contemporan, pentru zilele însorite.",
    icon: "🕶️",
  },
];

const opticFrames = products.filter((p) => p.category === "Rame optice");
const sunglasses = products.filter((p) => p.category === "Ochelari de soare");

export default function RamePage() {
  return (
    <div className="bg-white">
      <div className="container-padded py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
            Colecția de Rame
          </p>
          <h1 className="section-heading mt-2">Rame pentru fiecare stil</h1>
          <p className="mt-4 text-lg text-gray-600">
            De la clasicele rame optice, până la ochelarii de soare pentru
            sezonul cald — explorați ramele selecționate de echipa noastră, de
            la mărci precum Ray-Ban, Gucci, Prada, Oakley și Hackett.
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
          <h2 className="text-2xl font-bold text-gray-900">Rame Optice</h2>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {opticFrames.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">Ochelari de Soare</h2>
          <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sunglasses.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-brand-700 px-8 py-10 text-center">
          <h2 className="text-2xl font-bold text-white">
            Nu găsiți rama potrivită?
          </h2>
          <p className="mt-2 text-brand-100">
            Optometriștii noștri vă ajută să alegeți rama ideală pentru forma
            feței și stilul dumneavoastră.
          </p>
          <Link href="/contact" className="btn-secondary mt-6 inline-flex">
            Programează o consultație
          </Link>
        </div>
      </div>
    </div>
  );
}
