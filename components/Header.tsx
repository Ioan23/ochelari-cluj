"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/produse", label: "Produse" },
  { href: "/configurator", label: "Configurator" },
  { href: "/incarca-reteta", label: "Încarcă Rețeta" },
  { href: "/despre", label: "Despre Noi" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

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

          <div className="hidden items-center gap-4 md:flex">
            <Link href="/contact" className="btn-primary text-sm">
              Programează Consultație
            </Link>
          </div>

          <button
            type="button"
            className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
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
