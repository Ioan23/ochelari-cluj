import { NextRequest, NextResponse } from "next/server";
import { orderStatusLabels, type OrderStatus } from "@/lib/admin-data";
import { setOrderStatus } from "@/lib/server-store";
import { sendOrderStatusPush } from "@/lib/push-notifications";

const VALID_STATUSES = Object.keys(orderStatusLabels) as OrderStatus[];

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  const { status } = body as Record<string, unknown>;

  if (typeof status !== "string" || !VALID_STATUSES.includes(status as OrderStatus)) {
    return NextResponse.json({ error: "Status invalid." }, { status: 400 });
  }

  const order = setOrderStatus(params.id, status as OrderStatus);
  if (!order) {
    return NextResponse.json({ error: "Comanda nu a fost găsită." }, { status: 404 });
  }

  const push = await sendOrderStatusPush(order.id, order.status);

  return NextResponse.json({ order, push });
}
