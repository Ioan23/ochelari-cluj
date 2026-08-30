import { NextRequest, NextResponse } from "next/server";
import { getStripeClient } from "@/lib/stripe";
import { products } from "@/lib/data";

interface CheckoutRequestItem {
  productId: string;
  quantity: number;
}

export async function POST(request: NextRequest) {
  let body: { items?: CheckoutRequestItem[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corpul cererii trebuie să fie JSON valid." },
      { status: 400 }
    );
  }

  const requestedItems = Array.isArray(body.items) ? body.items : [];
  if (requestedItems.length === 0) {
    return NextResponse.json(
      { error: "Coșul este gol." },
      { status: 400 }
    );
  }

  const lineItems = [];
  for (const requested of requestedItems) {
    const quantity = Number(requested?.quantity);
    if (!requested?.productId || !Number.isInteger(quantity) || quantity <= 0) {
      return NextResponse.json(
        { error: "Articol de coș invalid." },
        { status: 400 }
      );
    }

    const product = products.find((p) => p.id === requested.productId);
    if (!product || !product.inStock) {
      return NextResponse.json(
        { error: `Produsul "${requested.productId}" nu este disponibil.` },
        { status: 400 }
      );
    }

    lineItems.push({
      quantity,
      price_data: {
        currency: "ron",
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: product.brand ? `${product.brand} ${product.name}` : product.name,
          description: product.description,
        },
      },
    });
  }

  const origin = request.headers.get("origin") ?? new URL(request.url).origin;

  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/comanda-confirmata?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cos?canceled=true`,
      shipping_address_collection: { allowed_countries: ["RO"] },
      billing_address_collection: "required",
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Sesiunea de plată nu a putut fi creată." },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Eroare necunoscută la Stripe.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
