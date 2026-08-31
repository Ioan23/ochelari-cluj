import { NextRequest, NextResponse } from "next/server";
import { removeSubscription } from "@/lib/server-store";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  const { orderId, endpoint } = body as Record<string, unknown>;

  if (typeof orderId !== "string" || orderId.trim().length === 0) {
    return NextResponse.json(
      { error: "Numărul comenzii este obligatoriu." },
      { status: 400 }
    );
  }

  if (typeof endpoint !== "string" || endpoint.trim().length === 0) {
    return NextResponse.json(
      { error: "Endpoint-ul abonării este obligatoriu." },
      { status: 400 }
    );
  }

  removeSubscription(orderId, endpoint);

  return NextResponse.json({ subscribed: false });
}
