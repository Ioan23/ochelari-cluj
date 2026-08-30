import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json(
      { error: "Parametrul session_id lipsește." },
      { status: 400 }
    );
  }

  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    return NextResponse.json({
      id: session.id,
      status: session.status,
      paymentStatus: session.payment_status,
      amountTotal: session.amount_total,
      currency: session.currency,
      customerEmail: session.customer_details?.email ?? null,
      lineItems:
        session.line_items?.data.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          amountTotal: item.amount_total,
        })) ?? [],
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Eroare necunoscută la Stripe.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
