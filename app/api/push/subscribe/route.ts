import { NextRequest, NextResponse } from "next/server";
import {
  addSubscription,
  getOrderWithCurrentStatus,
  isPushSubscriptionPayload,
} from "@/lib/server-store";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  const { orderId, subscription } = body as Record<string, unknown>;

  if (typeof orderId !== "string" || orderId.trim().length === 0) {
    return NextResponse.json(
      { error: "Numărul comenzii este obligatoriu." },
      { status: 400 }
    );
  }

  if (!isPushSubscriptionPayload(subscription)) {
    return NextResponse.json(
      { error: "Abonarea push este invalidă." },
      { status: 400 }
    );
  }

  const order = getOrderWithCurrentStatus(orderId);
  if (!order) {
    return NextResponse.json({ error: "Comanda nu a fost găsită." }, { status: 404 });
  }

  addSubscription(orderId, subscription);

  return NextResponse.json({ subscribed: true, status: order.status });
}
