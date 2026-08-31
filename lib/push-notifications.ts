import webpush from "web-push";
import type { OrderStatus } from "./admin-data";
import { orderStatusLabels } from "./admin-data";
import {
  getSubscriptions,
  removeSubscriptionByEndpoint,
  type PushSubscriptionPayload,
} from "./server-store";

const VAPID_SUBJECT = process.env.VAPID_SUBJECT ?? "mailto:contact@ochelaricluj.ro";

export function getVapidPublicKey(): string | null {
  return process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? null;
}

function isVapidConfigured(): boolean {
  return Boolean(getVapidPublicKey() && process.env.VAPID_PRIVATE_KEY);
}

let vapidConfigured = false;
function ensureVapidConfigured(): void {
  if (vapidConfigured || !isVapidConfigured()) return;
  webpush.setVapidDetails(
    VAPID_SUBJECT,
    getVapidPublicKey() as string,
    process.env.VAPID_PRIVATE_KEY as string
  );
  vapidConfigured = true;
}

export interface OrderStatusPushPayload {
  title: string;
  body: string;
  orderId: string;
  status: OrderStatus;
  url: string;
}

function buildPayload(orderId: string, status: OrderStatus): OrderStatusPushPayload {
  return {
    title: `Comanda ${orderId} — ${orderStatusLabels[status]}`,
    body: `Statusul comenzii tale s-a schimbat: ${orderStatusLabels[status]}.`,
    orderId,
    status,
    url: `/comanda/${orderId}`,
  };
}

export interface OrderStatusPushResult {
  configured: boolean;
  sent: number;
  failed: number;
}

/**
 * Trimite o notificare push tuturor browserelor abonate la o comandă, când statusul
 * acesteia se schimbă. Dacă cheile VAPID nu sunt configurate, trimiterea este simulată
 * printr-un jurnal în consolă — la fel ca notificările email/SMS din lib/notifications.ts.
 */
export async function sendOrderStatusPush(
  orderId: string,
  status: OrderStatus
): Promise<OrderStatusPushResult> {
  const subscriptions = getSubscriptions(orderId);
  const payload = buildPayload(orderId, status);

  if (!isVapidConfigured()) {
    console.log(
      `[notificări push] (simulat, VAPID neconfigurat) ${subscriptions.length} abonat(ți) pentru comanda ${orderId}: ${payload.body}`
    );
    return { configured: false, sent: subscriptions.length, failed: 0 };
  }

  ensureVapidConfigured();

  let sent = 0;
  let failed = 0;

  await Promise.all(
    subscriptions.map(async (subscription: PushSubscriptionPayload) => {
      try {
        await webpush.sendNotification(
          {
            endpoint: subscription.endpoint,
            keys: subscription.keys,
          },
          JSON.stringify(payload)
        );
        sent += 1;
      } catch (error) {
        failed += 1;
        const statusCode = (error as { statusCode?: number }).statusCode;
        if (statusCode === 404 || statusCode === 410) {
          removeSubscriptionByEndpoint(subscription.endpoint);
        } else {
          console.error(
            `[notificări push] Eroare la trimiterea notificării pentru comanda ${orderId}:`,
            error
          );
        }
      }
    })
  );

  return { configured: true, sent, failed };
}
