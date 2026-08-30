"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CosPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    clearCart,
    totalPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discount,
    totalAfterDiscount,
  } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [couponMessage, setCouponMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleApplyCoupon = (event: React.FormEvent) => {
    event.preventDefault();
    const result = applyCoupon(couponInput);
    setCouponMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });
    if (result.success) {
      setCouponInput("");
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponMessage(null);
  };

  if (items.length === 0) {
    return (
      <div className="bg-white">
        <div className="container-padded py-24 text-center">
          <h1 className="section-heading">Coșul tău este gol</h1>
          <p className="mt-4 text-lg text-gray-600">
            Adaugă produse din colecția noastră pentru a le vedea aici.
          </p>
          <Link href="/produse" className="btn-primary mt-8 inline-flex">
            Vezi produsele
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container-padded py-16">
        <div className="mb-10 flex items-end justify-between">
          <h1 className="section-heading">Coșul de Cumpărături</h1>
          <button
            type="button"
            onClick={clearCart}
            className="text-sm font-medium text-gray-500 hover:text-red-600"
          >
            Golește coșul
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 lg:col-span-2">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 p-4 sm:p-6">
                <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-4xl">
                  {item.emoji}
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="truncate text-base font-semibold text-gray-900">
                    {item.name}
                  </h2>
                  {item.brand && (
                    <p className="text-sm text-gray-500">{item.brand}</p>
                  )}
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {item.price.toLocaleString("ro-RO")} lei
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Scade cantitatea"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label="Crește cantitatea"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>

                <div className="w-24 flex-shrink-0 text-right text-sm font-semibold text-gray-900">
                  {(item.price * item.quantity).toLocaleString("ro-RO")} lei
                </div>

                <button
                  type="button"
                  aria-label="Elimină produsul"
                  onClick={() => removeItem(item.id)}
                  className="flex-shrink-0 rounded-md p-2 text-gray-400 hover:bg-gray-50 hover:text-red-600"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <div className="h-fit rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Sumar comandă</h2>

            <div className="mt-4">
              {appliedCoupon ? (
                <div className="flex items-center justify-between rounded-md bg-green-50 px-3 py-2 text-sm text-green-800">
                  <span>
                    Cod <strong>{appliedCoupon.code}</strong> aplicat
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="font-medium text-green-700 underline hover:text-green-900"
                  >
                    Elimină
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(event) => setCouponInput(event.target.value)}
                    placeholder="Cod promoțional"
                    className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                  <button
                    type="submit"
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Aplică
                  </button>
                </form>
              )}
              {couponMessage && (
                <p
                  className={`mt-2 text-sm ${
                    couponMessage.type === "success"
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  {couponMessage.text}
                </p>
              )}
            </div>

            <dl className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <dt>Subtotal</dt>
                <dd>{totalPrice.toLocaleString("ro-RO")} lei</dd>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-700">
                  <dt>Reducere</dt>
                  <dd>-{discount.toLocaleString("ro-RO")} lei</dd>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-600">
                <dt>Livrare</dt>
                <dd>Gratuită</dd>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-semibold text-gray-900">
                <dt>Total</dt>
                <dd>{totalAfterDiscount.toLocaleString("ro-RO")} lei</dd>
              </div>
            </dl>
            <Link href="/contact" className="btn-primary mt-6 block text-center">
              Finalizează comanda
            </Link>
            <Link
              href="/produse"
              className="mt-3 block text-center text-sm font-medium text-brand-700 hover:text-brand-800"
            >
              Continuă cumpărăturile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}