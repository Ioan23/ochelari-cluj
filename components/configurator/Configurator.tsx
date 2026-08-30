"use client";

import { useMemo, useRef, useState } from "react";
import ShapeSelector from "./ShapeSelector";
import ColorSelector from "./ColorSelector";
import LensTypeSelector from "./LensTypeSelector";
import LensOptionsSelector from "./LensOptionsSelector";
import Summary from "./Summary";
import {
  calculateTotal,
  frameColors,
  frameShapes,
  lensOptions,
  lensTypes,
} from "@/lib/configurator-data";

export default function Configurator() {
  const [shapeId, setShapeId] = useState(frameShapes[0].id);
  const [colorId, setColorId] = useState(frameColors[0].id);
  const [lensTypeId, setLensTypeId] = useState(lensTypes[0].id);
  const [optionIds, setOptionIds] = useState<string[]>([]);
  const summaryRef = useRef<HTMLDivElement>(null);

  const toggleOption = (id: string) => {
    setOptionIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  const shape = useMemo(
    () => frameShapes.find((item) => item.id === shapeId) ?? frameShapes[0],
    [shapeId]
  );
  const color = useMemo(
    () => frameColors.find((item) => item.id === colorId) ?? frameColors[0],
    [colorId]
  );
  const lens = useMemo(
    () => lensTypes.find((item) => item.id === lensTypeId) ?? lensTypes[0],
    [lensTypeId]
  );
  const selectedOptions = useMemo(
    () => lensOptions.filter((option) => optionIds.includes(option.id)),
    [optionIds]
  );
  const total = useMemo(
    () => calculateTotal(shape, lens, selectedOptions),
    [shape, lens, selectedOptions]
  );

  const scrollToSummary = () => {
    summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pb-24 lg:pb-0">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          <section>
            <h2 className="text-lg font-semibold text-gray-900">1. Forma ramei</h2>
            <p className="mt-1 text-sm text-gray-500">
              Alege silueta care ți se potrivește cel mai bine.
            </p>
            <div className="mt-4">
              <ShapeSelector selectedId={shapeId} onSelect={setShapeId} />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">2. Culoarea ramei</h2>
            <p className="mt-1 text-sm text-gray-500">
              Toate ramele sunt disponibile din acetat premium.
            </p>
            <div className="mt-4">
              <ColorSelector selectedId={colorId} onSelect={setColorId} />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">3. Tipul lentilelor</h2>
            <p className="mt-1 text-sm text-gray-500">
              Selectează lentilele potrivite stilului tău de viață.
            </p>
            <div className="mt-4">
              <LensTypeSelector selectedId={lensTypeId} onSelect={setLensTypeId} />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              4. Tratamente opționale
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Îmbunătățește lentilele cu tratamente suplimentare.
            </p>
            <div className="mt-4">
              <LensOptionsSelector selectedIds={optionIds} onToggle={toggleOption} />
            </div>
          </section>
        </div>

        <div className="lg:col-span-1" ref={summaryRef}>
          <div className="lg:sticky lg:top-24">
            <Summary shape={shape} color={color} lens={lens} options={selectedOptions} />
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] backdrop-blur pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <div>
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-bold text-brand-700">
            {total.toLocaleString("ro-RO")} lei
          </p>
        </div>
        <button
          type="button"
          onClick={scrollToSummary}
          className="btn-primary touch-manipulation active:scale-95"
        >
          Vezi sumarul
        </button>
      </div>
    </div>
  );
}
