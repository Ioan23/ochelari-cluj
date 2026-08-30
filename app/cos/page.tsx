"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/data";

function CanceledBanner() {
  const searchParams = useSearchParams();
  if (searchParams.get("canceled") !== "true") return null;

  return (
    <div className="mb-8 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-200">
      Plata a fost anulată. Coșul tău a fost păstrat, poți relua oricând.
    </div>
  );
}

export default function CosPage() {
  const { items, updateQuantity, removeItem, subtotal, itemCount } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const cartLines = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((line): line is { product: (typeof products)[number]; quantity: number } => line !== null);

  async function handleCheckout() {
    setCheckoutError(null);
    setIsCheckingOut(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Plata nu a putut fi inițiată.");
      }

      window.location.href = data.url;
    } catch (error) {
      setCheckoutError(
        error instanceof Error ? error.message : "A apărut o eroare neașteptată."
      );
      setIsCheckingOut(false);
    }
  }

  return (
    <div className="bg-white">
      <div className="container-padded py-16">
        <h1 className="section-heading">Coșul Tău</h1>

        <Suspense fallback={null}>
          <CanceledBanner />
        </Suspense>

        {cartLines.length === 0 ? (
          <div className="mt-10 rounded-xl bg-gray-50 p-10 text-center">
            <p className="text-gray-600">Coșul tău este momentan gol.</p>
            <Link href="/produse" className="btn-primary mt-6 inline-block">
              Vezi produsele
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ul className="divide-y divide-gray-200 rounded-xl ring-1 ring-gray-200">
                {cartLines.map(({ product, quantity }) => (
                  <li
                    key={product.id}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 text-3xl">
                        {product.emoji}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {product.name}
                        </p>
                        {product.brand && (
                          <p className="text-sm text-gray-500">{product.brand}</p>
                        )}
                        <p className="mt-1 text-sm text-gray-600">
                          {product.price.toLocaleString("ro-RO")} lei
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center rounded-lg ring-1 ring-gray-300">
                        <button
                          type="button"
                          className="px-3 py-1.5 text-gray-600 hover:bg-gray-50"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label="Scade cantitatea"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          className="px-3 py-1.5 text-gray-600 hover:bg-gray-50"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label="Crește cantitatea"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-sm font-medium text-gray-500 hover:text-red-600"
                        onClick={() => removeItem(product.id)}
                      >
                        Elimină
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-fit rounded-xl bg-gray-50 p-6 ring-1 ring-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Sumar</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">
                    Produse ({itemCount})
                  </dt>
                  <dd className="font-medium text-gray-900">
                    {subtotal.toLocaleString("ro-RO")} lei
                  </dd>
                </div>
              </dl>
              <div className="mt-4 flex justify-between border-t border-gray-200 pt-4">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-gray-900">
                  {subtotal.toLocaleString("ro-RO")} lei
                </span>
              </div>

              {checkoutError && (
                <p className="mt-4 text-sm text-red-600">{checkoutError}</p>
              )}

              <button
                type="button"
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCheckingOut ? "Se procesează..." : "Continuă spre plată"}
              </button>
              <p className="mt-3 text-center text-xs text-gray-500">
                Plata se procesează securizat prin Stripe.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
