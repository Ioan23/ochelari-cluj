import { NextRequest, NextResponse } from "next/server";
import { sendAppointmentConfirmation } from "@/lib/notifications";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  const { customerName, email, phone, address, date, time, notes } = body as Record<
    string,
    unknown
  >;

  if (
    !isNonEmptyString(customerName) ||
    !isNonEmptyString(email) ||
    !isNonEmptyString(phone) ||
    !isNonEmptyString(address) ||
    !isNonEmptyString(date) ||
    !isNonEmptyString(time)
  ) {
    return NextResponse.json(
      { error: "Completează toate câmpurile obligatorii." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Adresa de email nu este validă." },
      { status: 400 }
    );
  }

  const appointment = {
    id: `PRG-${Date.now().toString().slice(-6)}`,
    customerName: customerName.slice(0, 200),
    email,
    phone,
    address: address.slice(0, 300),
    date,
    time,
    notes: isNonEmptyString(notes) ? notes.slice(0, 500) : undefined,
    status: "in_asteptare" as const,
  };

  const notifications = await sendAppointmentConfirmation({
    customerName: appointment.customerName,
    email: appointment.email,
    phone: appointment.phone,
    address: appointment.address,
    date: appointment.date,
    time: appointment.time,
  });

  return NextResponse.json({
    appointment,
    notifications,
  });
}
