"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartLink({ className = "" }: { className?: string }) {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cos"
      className={`relative flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-brand-700 ${className}`}
      aria-label="Coșul meu"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l3.2-8.4H5.4M7 13L5.4 4.6M7 13l-2.29 2.29A1 1 0 006 17h12M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-700 px-1 text-xs font-semibold text-white">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
