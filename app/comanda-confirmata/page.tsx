import type { Metadata } from "next";
import Link from "next/link";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Comandă Confirmată",
  description: "Confirmarea plății și a comenzii dumneavoastră.",
  robots: {
    index: false,
    follow: false,
  },
};

interface ComandaConfirmataPageProps {
  searchParams: { session_id?: string };
}

export default async function ComandaConfirmataPage({
  searchParams,
}: ComandaConfirmataPageProps) {
  const sessionId = searchParams.session_id;
  let amountTotal: number | null = null;
  let currency: string | null = null;
  let email: string | null = null;

  if (sessionId && stripe) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      amountTotal = session.amount_total;
      currency = session.currency;
      email = session.customer_details?.email ?? null;
    } catch (error) {
      console.error("Nu am putut încărca sesiunea Stripe:", error);
    }
  }

  return (
    <div className="bg-white">
      <div className="container-padded py-24 text-center">
        <div className="mx-auto max-w-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
            ✅
          </div>
          <h1 className="section-heading mt-6">Comanda a fost plasată!</h1>
          <p className="mt-4 text-lg text-gray-600">
            Vă mulțumim, plata a fost procesată cu succes
            {amountTotal !== null
              ? ` (${(amountTotal / 100).toLocaleString("ro-RO")} ${currency?.toUpperCase() ?? "lei"})`
              : ""}
            .
          </p>
          {email && (
            <p className="mt-2 text-sm text-gray-500">
              Un email de confirmare a fost trimis la {email}.
            </p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            Un consultant Ochelari Cluj vă va contacta în curând pentru detalii legate de
            livrare sau ridicare din magazin.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/produse" className="btn-primary">
              Înapoi la produse
            </Link>
            <Link href="/urmarire-comanda" className="btn-secondary">
              Urmărește comanda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}