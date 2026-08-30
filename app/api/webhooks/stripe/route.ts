import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { generateInvoice, issueInvoice } from "@/lib/invoicing";

export async function POST(request: NextRequest) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Webhook-ul Stripe nu este configurat." },
      { status: 503 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Semnătură lipsă." }, { status: 400 });
  }

  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error("Semnătură webhook Stripe invalidă:", error);
    return NextResponse.json({ error: "Semnătură invalidă." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(
      `Comandă finalizată — sesiune ${session.id}, sumă ${
        session.amount_total !== null ? session.amount_total / 100 : "?"
      } ${session.currency?.toUpperCase()}, client ${session.customer_details?.email ?? "necunoscut"}`
    );

    await generateAndIssueInvoice(session);
  }

  return NextResponse.json({ received: true });
}

async function generateAndIssueInvoice(session: Stripe.Checkout.Session) {
  if (!stripe) return;

  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

    const items = lineItems.data
      .filter((item) => item.quantity !== null && item.quantity > 0)
      .map((item) => {
        const quantity = item.quantity ?? 1;
        return {
          description: item.description ?? "Produs Ochelari Cluj",
          quantity,
          unitPrice:
            item.amount_total !== null ? item.amount_total / 100 / quantity : 0,
        };
      });

    if (items.length === 0) return;

    const sequence = Number(Date.now().toString().slice(-6));
    const invoice = generateInvoice(
      {
        orderId: session.id,
        customerName: session.customer_details?.name ?? "Client Ochelari Cluj",
        customerEmail: session.customer_details?.email ?? "necunoscut@ochelari-cluj.ro",
        issueDate: new Date().toISOString().slice(0, 10),
        items,
      },
      sequence
    );

    await issueInvoice(invoice);
  } catch (error) {
    console.error(
      `Nu am putut genera automat factura fiscală pentru sesiunea ${session.id}:`,
      error
    );
  }
}
