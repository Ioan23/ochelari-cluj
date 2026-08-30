export interface AppointmentNotificationDetails {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  time: string;
}

export interface NotificationResult {
  emailSent: boolean;
  smsSent: boolean;
}

function buildConfirmationMessage({
  customerName,
  address,
  date,
  time,
}: AppointmentNotificationDetails) {
  return `Bună, ${customerName}! Consultația ta optică la domiciliu a fost programată pe ${date}, ora ${time}, la adresa ${address}. Îți mulțumim că ai ales Ochelari Cluj!`;
}

async function sendConfirmationEmail(
  details: AppointmentNotificationDetails
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.NOTIFICATIONS_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    console.log(
      `[notificări] Email de confirmare (simulat) către ${details.email}: ${buildConfirmationMessage(details)}`
    );
    return true;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: details.email,
        subject: "Confirmare consultație la domiciliu — Ochelari Cluj",
        text: buildConfirmationMessage(details),
      }),
    });

    if (!response.ok) {
      console.error(
        `[notificări] Trimiterea emailului a eșuat (status ${response.status}) pentru ${details.email}`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("[notificări] Eroare la trimiterea emailului de confirmare:", error);
    return false;
  }
}

async function sendConfirmationSms(
  details: AppointmentNotificationDetails
): Promise<boolean> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.log(
      `[notificări] SMS de confirmare (simulat) către ${details.phone}: ${buildConfirmationMessage(details)}`
    );
    return true;
  }

  try {
    const credentials = Buffer.from(`${accountSid}:${authToken}`).toString(
      "base64"
    );
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: details.phone,
          From: fromNumber,
          Body: buildConfirmationMessage(details),
        }),
      }
    );

    if (!response.ok) {
      console.error(
        `[notificări] Trimiterea SMS-ului a eșuat (status ${response.status}) pentru ${details.phone}`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("[notificări] Eroare la trimiterea SMS-ului de confirmare:", error);
    return false;
  }
}

export async function sendAppointmentConfirmation(
  details: AppointmentNotificationDetails
): Promise<NotificationResult> {
  const [emailSent, smsSent] = await Promise.all([
    sendConfirmationEmail(details),
    sendConfirmationSms(details),
  ]);

  return { emailSent, smsSent };
}
