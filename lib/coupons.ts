export type CouponType = "percentage" | "fixed";

export interface Coupon {
  code: string;
  type: CouponType;
  value: number;
  description: string;
  minOrder?: number;
}

export const coupons: Coupon[] = [
  {
    code: "BINEVENIT10",
    type: "percentage",
    value: 10,
    description: "10% reducere la prima comandă",
  },
  {
    code: "VARA2026",
    type: "percentage",
    value: 15,
    description: "15% reducere de vară",
    minOrder: 500,
  },
  {
    code: "REDUCERE50",
    type: "fixed",
    value: 50,
    description: "50 lei reducere",
    minOrder: 300,
  },
];

export function findCoupon(code: string): Coupon | undefined {
  const normalized = code.trim().toUpperCase();
  if (!normalized) return undefined;
  return coupons.find((coupon) => coupon.code === normalized);
}

export function calculateDiscount(coupon: Coupon, subtotal: number): number {
  if (coupon.minOrder && subtotal < coupon.minOrder) return 0;
  const rawDiscount =
    coupon.type === "percentage"
      ? (subtotal * coupon.value) / 100
      : coupon.value;
  return Math.min(rawDiscount, subtotal);
}
