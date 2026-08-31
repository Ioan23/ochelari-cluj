"use client";

import { useEffect, useState } from "react";

type SupportState = "checking" | "unsupported" | "supported";
type SubscriptionState = "unknown" | "subscribed" | "unsubscribed" | "denied";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from(Array.from(rawData).map((char) => char.charCodeAt(0)));
}

export default function OrderPushNotifications({ orderId }: { orderId: string }) {
  const [support, setSupport] = useState<SupportState>("checking");
  const [subscriptionState, setSubscriptionState] = useState<SubscriptionState>("unknown");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function checkStatus() {
      if (
        typeof window === "undefined" ||
        !("serviceWorker" in navigator) ||
        !("PushManager" in window)
      ) {
        if (!cancelled) setSupport("unsupported");
        return;
      }

      if (!cancelled) setSupport("supported");

      if (Notification.permission === "denied") {
        if (!cancelled) setSubscriptionState("denied");
        return;
      }

      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        const existing = await registration.pushManager.getSubscription();
        if (!cancelled) {
          setSubscriptionState(existing ? "subscribed" : "unsubscribed");
        }
      } catch {
        if (!cancelled) setSubscriptionState("unsubscribed");
      }
    }

    checkStatus();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubscribe() {
    setLoading(true);
    setError(null);

    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setSubscriptionState(permission === "denied" ? "denied" : "unsubscribed");
        return;
      }

      const keyResponse = await fetch("/api/push/public-key");
      const { publicKey } = await keyResponse.json();

      if (!publicKey) {
        setError(
          "Notificările push nu sunt configurate momentan pe acest site. Încearcă mai târziu."
        );
        return;
      }

      const registration = await navigator.serviceWorker.register("/sw.js");
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey) as BufferSource,
      });

      const response = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, subscription: subscription.toJSON() }),
      });

      if (!response.ok) {
        throw new Error("Abonarea a eșuat.");
      }

      setSubscriptionState("subscribed");
    } catch {
      setError("Nu am putut activa notificările. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUnsubscribe() {
    setLoading(true);
    setError(null);

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      const subscription = await registration?.pushManager.getSubscription();

      if (subscription) {
        await fetch("/api/push/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, endpoint: subscription.endpoint }),
        });
        await subscription.unsubscribe();
      }

      setSubscriptionState("unsubscribed");
    } catch {
      setError("Nu am putut dezactiva notificările. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  }

  if (support === "unsupported") {
    return (
      <p className="text-sm text-gray-500">
        Browserul tău nu suportă notificări push.
      </p>
    );
  }

  if (support === "checking") {
    return null;
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <p className="text-sm font-medium text-gray-900">
        Notificări în browser pentru statusul comenzii
      </p>
      <p className="mt-1 text-sm text-gray-600">
        Primești un mesaj instant în browser de fiecare dată când statusul comenzii{" "}
        {orderId} se schimbă.
      </p>

      {subscriptionState === "denied" && (
        <p className="mt-3 text-sm text-red-600">
          Ai blocat notificările pentru acest site. Le poți activa din setările
          browserului.
        </p>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      {subscriptionState === "subscribed" ? (
        <button
          type="button"
          onClick={handleUnsubscribe}
          disabled={loading}
          className="btn-secondary mt-3 text-sm disabled:opacity-60"
        >
          {loading ? "Se dezactivează..." : "Dezactivează notificările"}
        </button>
      ) : (
        subscriptionState !== "denied" && (
          <button
            type="button"
            onClick={handleSubscribe}
            disabled={loading}
            className="btn-primary mt-3 text-sm disabled:opacity-60"
          >
            {loading ? "Se activează..." : "Activează notificările"}
          </button>
        )
      )}
    </div>
  );
}
