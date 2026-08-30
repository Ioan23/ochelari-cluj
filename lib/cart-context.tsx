"use client";

import {
  createContext,
   useCallback,
   useContext,
   useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/data";
import { calculateDiscount, findCoupon, type Coupon } from "@/lib/coupons";

export interface CartItem {
  id: string;
  name: string;
  brand?: string;
  price: number;
  emoji: string;
  quantity: number;
}

export interface ApplyCouponResult {
  success: boolean;
  message: string;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => ApplyCouponResult;
  removeCoupon: () => void;
  discount: number;
  totalAfterDiscount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "ochelari-cluj-cart";
const COUPON_STORAGE_KEY = "ochelari-cluj-coupon";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
      const storedCoupon = window.localStorage.getItem(COUPON_STORAGE_KEY);
      if (storedCoupon) {
        setCouponCode(storedCoupon);
      }
    } catch {
      // Ignore corrupted or inaccessible storage and start with an empty cart.
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage write failures (e.g. private browsing quota).
    }
  }, [items, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (couponCode) {
        window.localStorage.setItem(COUPON_STORAGE_KEY, couponCode);
      } else {
        window.localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch {
      // Ignore storage write failures (e.g. private browsing quota).
    }
  }, [couponCode, isHydrated]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          emoji: product.emoji,
          quantity,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((item) => item.id !== id));
      return;
    }
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCouponCode(null);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const appliedCoupon = useMemo(
    () => (couponCode ? findCoupon(couponCode) ?? null : null),
    [couponCode]
  );

  const applyCoupon = useCallback(
    (code: string): ApplyCouponResult => {
      const coupon = findCoupon(code);
      if (!coupon) {
        return { success: false, message: "Codul promoțional nu este valid." };
      }
      if (coupon.minOrder && totalPrice < coupon.minOrder) {
        return {
          success: false,
          message: `Comandă minimă de ${coupon.minOrder.toLocaleString("ro-RO")} lei pentru acest cod.`,
        };
      }
      setCouponCode(coupon.code);
      return { success: true, message: `Cod aplicat: ${coupon.description}.` };
    },
    [totalPrice]
  );

  const removeCoupon = useCallback(() => {
    setCouponCode(null);
  }, []);

  const discount = useMemo(
    () => (appliedCoupon ? calculateDiscount(appliedCoupon, totalPrice) : 0),
    [appliedCoupon, totalPrice]
  );

  const totalAfterDiscount = useMemo(
    () => Math.max(totalPrice - discount, 0),
    [totalPrice, discount]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      discount,
      totalAfterDiscount,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      discount,
      totalAfterDiscount,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}