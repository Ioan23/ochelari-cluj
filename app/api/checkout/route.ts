import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { products } from "@/lib/data";

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      {
        error:
          "Plata online nu este configurată momentan. Contactați-ne pentru a finaliza comanda.",
      },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  let lineItem: Stripe.Checkout.SessionCreateParams.LineItem;

  if (body.type === "product") {
    const product = products.find((item) => item.id === body.productId);
    if (!product || !product.inStock) {
      return NextResponse.json({ error: "Produs indisponibil." }, { status: 400 });
    }
    lineItem = {
      quantity: 1,
      price_data: {
        currency: "ron",
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: product.brand ? `${product.brand} ${product.name}` : product.name,
          description: product.description,
        },
      },
    };
  } else if (body.type === "custom") {
    const amount = Number(body.amount);
    const name =
      typeof body.name === "string" && body.name.trim()
        ? body.name.slice(0, 200)
        : "Ochelari Personalizați";

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Sumă invalidă." }, { status: 400 });
    }

    lineItem = {
      quantity: 1,
      price_data: {
        currency: "ron",
        unit_amount: Math.round(amount * 100),
        product_data: { name },
      },
    };
  } else {
    return NextResponse.json({ error: "Tip de comandă necunoscut." }, { status: 400 });
  }

  const origin = request.headers.get("origin") ?? request.nextUrl.origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [lineItem],
      locale: "ro",
      success_url: `${origin}/comanda-confirmata?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/comanda-anulata`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Eroare la crearea sesiunii Stripe Checkout:", error);
    return NextResponse.json(
      { error: "Nu am putut iniția plata. Încercați din nou." },
      { status: 502 }
    );
  }
}