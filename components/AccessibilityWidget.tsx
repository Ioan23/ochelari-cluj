"use client";

import { useEffect, useRef, useState } from "react";
import { useAccessibility, type FontSize } from "@/lib/accessibility-context";

const FONT_SIZE_OPTIONS: { value: FontSize; label: string }[] = [
  { value: "normal", label: "A" },
  { value: "large", label: "A+" },
  { value: "x-large", label: "A++" },
];

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    highContrast,
    fontSize,
    underlineLinks,
    reduceMotion,
    toggleHighContrast,
    setFontSize,
    toggleUnderlineLinks,
    toggleReduceMotion,
    resetSettings,
    isDefault,
  } = useAccessibility();

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div className="fixed bottom-4 right-4 z-[100] sm:bottom-6 sm:right-6">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Opțiuni de accesibilitate"
          className="mb-3 w-80 max-w-[calc(100vw-2rem)] rounded-xl border border-gray-200 bg-white p-4 shadow-2xl"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">
              Accesibilitate
            </h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Închide panoul de accesibilitate"
              className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
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
          </div>

          <div className="space-y-4">
            <fieldset>
              <legend className="mb-2 text-sm font-medium text-gray-700">
                Mărime text
              </legend>
              <div className="flex gap-2">
                {FONT_SIZE_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFontSize(option.value)}
                    aria-pressed={fontSize === option.value}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                      fontSize === option.value
                        ? "border-brand-700 bg-brand-700 text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <AccessibilityToggle
              label="Contrast ridicat"
              description="Culori cu contrast maxim pentru citire mai ușoară"
              checked={highContrast}
              onChange={toggleHighContrast}
            />

            <AccessibilityToggle
              label="Subliniază linkurile"
              description="Toate linkurile sunt subliniate pentru a fi ușor de identificat"
              checked={underlineLinks}
              onChange={toggleUnderlineLinks}
            />

            <AccessibilityToggle
              label="Redu animațiile"
              description="Oprește tranzițiile și animațiile de pe pagină"
              checked={reduceMotion}
              onChange={toggleReduceMotion}
            />

            <button
              type="button"
              onClick={resetSettings}
              disabled={isDefault}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Resetează la implicit
            </button>
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label="Deschide opțiunile de accesibilitate"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-700 text-white shadow-lg transition-colors hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
      >
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" strokeWidth={2} />
          <circle cx="12" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7.5 10.5h9M12 10.5v4.5M9.5 18.5l2.5-3.5 2.5 3.5"
          />
        </svg>
      </button>
    </div>
  );
}

function AccessibilityToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-3">
      <span>
        <span className="block text-sm font-medium text-gray-900">{label}</span>
        <span className="block text-xs text-gray-500">{description}</span>
      </span>
      <span className="relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <span
          className={`h-6 w-11 rounded-full transition-colors ${
            checked ? "bg-brand-700" : "bg-gray-300"
          }`}
        />
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </label>
  );
}
