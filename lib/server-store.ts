import { orders, type Order, type OrderStatus } from "./admin-data";

export interface PushSubscriptionKeys {
  p256dh: string;
  auth: string;
}

export interface PushSubscriptionPayload {
  endpoint: string;
  keys: PushSubscriptionKeys;
}

interface ServerStore {
  orderStatusOverrides: Map<string, OrderStatus>;
  pushSubscriptions: Map<string, PushSubscriptionPayload[]>;
}

/**
 * Next.js compilează fiecare route handler ca punct de intrare webpack separat,
 * astfel încât un modul obișnuit importat din mai multe rute ajunge să aibă o
 * instanță separată (cu propria stare) în fiecare bundle — o mutație făcută
 * într-o rută nu se vede în alta. Atașăm depozitul de `globalThis`, care este
 * cu adevărat unic per proces Node, pentru a avea o singură sursă de adevăr
 * pentru statusul comenzilor și abonările push (fără bază de date reală, la
 * fel ca restul datelor mock din lib/admin-data.ts).
 */
const globalForStore = globalThis as unknown as {
  __ochelariServerStore?: ServerStore;
};

function getStore(): ServerStore {
  if (!globalForStore.__ochelariServerStore) {
    globalForStore.__ochelariServerStore = {
      orderStatusOverrides: new Map(),
      pushSubscriptions: new Map(),
    };
  }
  return globalForStore.__ochelariServerStore;
}

/**
 * Returnează comanda din datele mock (lib/admin-data.ts) cu statusul curent,
 * ținând cont de eventualele schimbări de status făcute din panoul de admin
 * (care, altfel, s-ar pierde din cauza izolării modulelor descrise mai sus).
 */
export function getOrderWithCurrentStatus(orderId: string): Order | undefined {
  const order = orders.find((candidate) => candidate.id === orderId);
  if (!order) return undefined;

  const override = getStore().orderStatusOverrides.get(orderId);
  return override ? { ...order, status: override } : order;
}

export function setOrderStatus(orderId: string, status: OrderStatus): Order | undefined {
  const order = orders.find((candidate) => candidate.id === orderId);
  if (!order) return undefined;

  getStore().orderStatusOverrides.set(orderId, status);
  return { ...order, status };
}

export function isPushSubscriptionPayload(
  value: unknown
): value is PushSubscriptionPayload {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  if (typeof candidate.endpoint !== "string" || candidate.endpoint.length === 0) {
    return false;
  }
  const keys = candidate.keys as Record<string, unknown> | undefined;
  return (
    !!keys &&
    typeof keys === "object" &&
    typeof keys.p256dh === "string" &&
    typeof keys.auth === "string"
  );
}

export function addSubscription(
  orderId: string,
  subscription: PushSubscriptionPayload
): void {
  const store = getStore();
  const existing = store.pushSubscriptions.get(orderId) ?? [];
  const withoutDuplicate = existing.filter(
    (entry) => entry.endpoint !== subscription.endpoint
  );
  withoutDuplicate.push(subscription);
  store.pushSubscriptions.set(orderId, withoutDuplicate);
}

export function removeSubscription(orderId: string, endpoint: string): void {
  const store = getStore();
  const existing = store.pushSubscriptions.get(orderId);
  if (!existing) return;
  const remaining = existing.filter((entry) => entry.endpoint !== endpoint);
  if (remaining.length > 0) {
    store.pushSubscriptions.set(orderId, remaining);
  } else {
    store.pushSubscriptions.delete(orderId);
  }
}

export function removeSubscriptionByEndpoint(endpoint: string): void {
  const store = getStore();
  store.pushSubscriptions.forEach((subscriptions, orderId) => {
    const remaining = subscriptions.filter((entry) => entry.endpoint !== endpoint);
    if (remaining.length > 0) {
      store.pushSubscriptions.set(orderId, remaining);
    } else {
      store.pushSubscriptions.delete(orderId);
    }
  });
}

export function getSubscriptions(orderId: string): PushSubscriptionPayload[] {
  return getStore().pushSubscriptions.get(orderId) ?? [];
}
