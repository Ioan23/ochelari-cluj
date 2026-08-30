"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart-context";

interface SessionSummary {
  id: string;
  status: string | null;
  paymentStatus: string | null;
  amountTotal: number | null;
  currency: string | null;
  customerEmail: string | null;
}

function OrderConfirmation() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const [summary, setSummary] = useState<SessionSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(Boolean(sessionId));

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    fetch(`/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Comanda nu a putut fi găsită.");
        return data as SessionSummary;
      })
      .then((data) => {
        if (cancelled) return;
        setSummary(data);
        if (data.paymentStatus === "paid") {
          clearCart();
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Eroare necunoscută.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (!sessionId) {
    return (
      <div className="text-center">
        <p className="text-gray-600">
          Nu am găsit nicio comandă recentă. Dacă tocmai ai finalizat o plată,
          reîncarcă pagina de confirmare din emailul Stripe.
        </p>
        <Link href="/produse" className="btn-primary mt-6 inline-block">
          Înapoi la produse
        </Link>
      </div>
    );
  }

  if (loading) {
    return <p className="text-center text-gray-600">Se confirmă comanda...</p>;
  }

  if (error || !summary) {
    return (
      <div className="text-center">
        <p className="text-red-600">{error ?? "Comanda nu a putut fi confirmată."}</p>
        <Link href="/cos" className="btn-primary mt-6 inline-block">
          Înapoi la coș
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
        ✓
      </div>
      <h1 className="section-heading mt-6">Comandă confirmată!</h1>
      <p className="mt-4 text-gray-600">
        Îți mulțumim pentru comandă. Vei primi un email de confirmare
        {summary.customerEmail ? ` la ${summary.customerEmail}` : ""}.
      </p>

      <dl className="mx-auto mt-8 max-w-sm space-y-2 rounded-xl bg-gray-50 p-6 text-left text-sm ring-1 ring-gray-200">
        <div className="flex justify-between">
          <dt className="text-gray-600">Număr comandă</dt>
          <dd className="font-medium text-gray-900">{summary.id.slice(-12)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Status plată</dt>
          <dd className="font-medium text-gray-900">
            {summary.paymentStatus === "paid" ? "Plătită" : summary.paymentStatus}
          </dd>
        </div>
        {summary.amountTotal !== null && (
          <div className="flex justify-between">
            <dt className="text-gray-600">Total</dt>
            <dd className="font-medium text-gray-900">
              {(summary.amountTotal / 100).toLocaleString("ro-RO")}{" "}
              {summary.currency?.toUpperCase()}
            </dd>
          </div>
        )}
      </dl>

      <Link href="/produse" className="btn-primary mt-8 inline-block">
        Continuă cumpărăturile
      </Link>
    </div>
  );
}

export default function ComandaConfirmataPage() {
  return (
    <div className="bg-white">
      <div className="container-padded py-16">
        <div className="mx-auto max-w-2xl">
          <Suspense
            fallback={<p className="text-center text-gray-600">Se încarcă...</p>}
          >
            <OrderConfirmation />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
