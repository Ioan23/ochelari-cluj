import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Produse",
  description:
    "Explorați colecția noastră completă de rame, lentile și ochelari de soare.",
};

const categories = ["Toate", "Rame optice", "Ochelari de soare", "Lentile de contact"];

export default function ProduseePage() {
  return (
    <div className="bg-white">
      <div className="container-padded py-16">
        <div className="mb-10">
          <h1 className="section-heading">Produsele Noastre</h1>
          <p className="mt-4 text-lg text-gray-600">
            Descoperiti colecția noastră atent selecționată de ochelari și accesorii optice.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                cat === "Toate"
                  ? "bg-brand-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
