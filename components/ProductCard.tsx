import Link from "next/link";
import type { Product } from "@/lib/data";
import BuyButton from "@/components/BuyButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <div className="flex h-full items-center justify-center text-6xl">
          {product.emoji}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-600">
          {product.category}
        </p>
        <h3 className="mt-1 text-base font-semibold text-gray-900 group-hover:text-brand-700">
          <Link href={`/produse/${product.id}`}>
            <span className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        {product.brand && (
          <p className="mt-0.5 text-sm text-gray-500">{product.brand}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold text-gray-900">
            {product.price.toLocaleString("ro-RO")} lei
          </span>
          {product.inStock ? (
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              În stoc
            </span>
          ) : (
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
              Indisponibil
            </span>
          )}
        </div>
        {product.inStock && (
          <BuyButton
            payload={{ type: "product", productId: product.id }}
            className="relative z-10 mt-3 inline-flex w-full items-center justify-center rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cumpără acum
          </BuyButton>
        )}
      </div>
    </div>
  );
}
