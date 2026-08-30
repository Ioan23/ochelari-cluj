import { NextRequest, NextResponse } from "next/server";
import { sendAppointmentConfirmation } from "@/lib/notifications";
import {
  HOME_VISIT_TIME_SLOTS,
  createAppointment,
  getBookedTimesForDate,
  isTimeSlotAvailable,
} from "@/lib/admin-data";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  if (!date || !DATE_REGEX.test(date)) {
    return NextResponse.json(
      { error: "Parametrul 'date' este obligatoriu și trebuie să aibă formatul AAAA-LL-ZZ." },
      { status: 400 }
    );
  }

  const bookedTimes = getBookedTimesForDate(date);

  return NextResponse.json({
    slots: HOME_VISIT_TIME_SLOTS,
    bookedTimes,
    availableSlots: HOME_VISIT_TIME_SLOTS.filter((slot) => !bookedTimes.includes(slot)),
  });
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

  if (!DATE_REGEX.test(date)) {
    return NextResponse.json(
      { error: "Data selectată nu este validă." },
      { status: 400 }
    );
  }

  if (!HOME_VISIT_TIME_SLOTS.includes(time)) {
    return NextResponse.json(
      { error: "Intervalul orar selectat nu este valid." },
      { status: 400 }
    );
  }

  if (!isTimeSlotAvailable(date, time)) {
    return NextResponse.json(
      {
        error:
          "Intervalul orar selectat a fost deja rezervat. Alege un alt interval pentru data respectivă.",
      },
      { status: 409 }
    );
  }

  const customerNameValue = customerName.slice(0, 200);
  const addressValue = address.slice(0, 300);
  const notesValue = isNonEmptyString(notes) ? notes.slice(0, 500) : undefined;

  // Reserve the slot synchronously (no `await` between the availability check
  // above and this write) so two concurrent requests can't both pass the
  // check and double-book the same date/time.
  const appointment = createAppointment({
    customerName: customerNameValue,
    email,
    phone,
    address: addressValue,
    date,
    time,
    notes: notesValue,
    emailSent: false,
    smsSent: false,
  });

  const notifications = await sendAppointmentConfirmation({
    customerName: customerNameValue,
    email,
    phone,
    address: addressValue,
    date,
    time,
  });

  appointment.emailSent = notifications.emailSent;
  appointment.smsSent = notifications.smsSent;

  return NextResponse.json({
    appointment,
    notifications,
  });
}
