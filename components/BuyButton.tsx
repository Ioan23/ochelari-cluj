"use client";

import { useState } from "react";

type BuyButtonPayload =
  | { type: "product"; productId: string }
  | { type: "custom"; name: string; amount: number };

interface BuyButtonProps {
  payload: BuyButtonPayload;
  className?: string;
  children: React.ReactNode;
}

export default function BuyButton({ payload, className, children }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "A apărut o eroare la inițierea plății.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "A apărut o eroare la inițierea plății."
      );
      setLoading(false);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleClick} disabled={loading} className={className}>
        {loading ? "Se procesează..." : children}
      </button>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
