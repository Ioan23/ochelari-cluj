"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { usePrescriptions } from "@/lib/prescriptions-context";

const navLinks = [
  { href: "/produse", label: "Produse" },
  { href: "/rame", label: "Rame" },
  { href: "/lentile", label: "Lentile" },
  { href: "/configurator", label: "Configurator" },
  { href: "/incarca-reteta", label: "Încarcă Rețeta" },
  { href: "/blog", label: "Blog" },
  { href: "/recenzii", label: "Recenzii" },
  { href: "/despre", label: "Despre Noi" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalSaved } = usePrescriptions();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="container-padded">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-brand-700">Ochelari</span>
            <span className="text-2xl font-light text-gray-500">Cluj</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 md:flex">
            <AccountLink totalSaved={totalSaved} />
            <CartLink totalItems={totalItems} />
            <Link href="/contact" className="btn-primary text-sm">
              Programează Consultație
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <AccountLink totalSaved={totalSaved} />
            <CartLink totalItems={totalItems} />
            <button
              type="button"
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-gray-100 pb-4 pt-2 md:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 px-3">
                <Link
                  href="/contact"
                  className="btn-primary block text-center text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  Programează Consultație
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function CartLink({ totalItems }: { totalItems: number }) {
  return (
    <Link
      href="/cos"
      className="relative rounded-md p-2 text-gray-700 hover:bg-gray-100"
      aria-label={`Coș de cumpărături${totalItems > 0 ? ` (${totalItems} produse)` : ""}`}
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
          d="M3 3h2l.4 2M7 13h10l3.6-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-700 px-1 text-xs font-semibold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}

function AccountLink({ totalSaved }: { totalSaved: number }) {
  return (
    <Link
      href="/cont"
      className="relative rounded-md p-2 text-gray-700 hover:bg-gray-100"
      aria-label={`Contul meu${totalSaved > 0 ? ` (${totalSaved} rețete salvate)` : ""}`}
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
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      {totalSaved > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-700 px-1 text-xs font-semibold text-white">
          {totalSaved}
        </span>
      )}
    </Link>
  );
}