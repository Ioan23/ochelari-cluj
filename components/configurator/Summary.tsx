import Link from "next/link";
import GlassesPreview from "./GlassesPreview";
import BuyButton from "@/components/BuyButton";
import type { FrameColor, FrameShape, LensOption, LensType } from "@/lib/configurator-data";
import { frameBasePrice } from "@/lib/configurator-data";

interface SummaryProps {
  shape: FrameShape;
  color: FrameColor;
  lens: LensType;
  options: LensOption[];
}

export default function Summary({ shape, color, lens, options }: SummaryProps) {
  const optionsTotal = options.reduce((sum, option) => sum + option.price, 0);
  const total = frameBasePrice + shape.priceModifier + lens.price + optionsTotal;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
      <GlassesPreview
        frameColorHex={color.hex}
        lensTint={lens.tint}
        lensTintOpacity={lens.tintOpacity}
        lensBorderRadius={shape.borderRadius}
      />

      <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Configurația ta
      </h3>

      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-gray-600">
            Ramă {shape.name.toLowerCase()}, {color.name.toLowerCase()}
          </dt>
          <dd className="font-medium text-gray-900">
            {frameBasePrice + shape.priceModifier} lei
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-gray-600">Lentile {lens.name.toLowerCase()}</dt>
          <dd className="font-medium text-gray-900">{lens.price} lei</dd>
        </div>
        {options.map((option) => (
          <div key={option.id} className="flex items-center justify-between">
            <dt className="text-gray-600">{option.name}</dt>
            <dd className="font-medium text-gray-900">+{option.price} lei</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="text-base font-semibold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-brand-700">
          {total.toLocaleString("ro-RO")} lei
        </span>
      </div>

      <BuyButton
        payload={{
          type: "custom",
          name: `Ochelari personalizați – ${shape.name}, ${color.name}, ${lens.name}`,
          amount: total,
        }}
        className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        Comandă și Plătește Online
      </BuyButton>
      <Link href="/contact" className="btn-secondary mt-3 w-full">
        Solicită Ofertă Personalizată
      </Link>
      <p className="mt-3 text-center text-xs text-gray-500">
        Plata se procesează securizat prin Stripe. Un consultant vă va contacta pentru
        confirmarea configurației.
      </p>
    </div>
  );
}
