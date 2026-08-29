import Link from "next/link";
import ProductCard from "./ProductCard";
import { products } from "@/lib/data";

export default function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section className="bg-white py-16">
      <div className="container-padded">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="section-heading">Produse Recomandate</h2>
            <p className="mt-2 text-lg text-gray-600">
              Selecția echipei noastre pentru sezonul acesta
            </p>
          </div>
          <Link
            href="/produse"
            className="hidden text-sm font-semibold text-brand-700 hover:text-brand-800 sm:block"
          >
            Vezi toate →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/produse" className="btn-secondary">
            Vezi toate produsele
          </Link>
        </div>
      </div>
    </section>
  );
}
