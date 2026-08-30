import { frameShapes } from "@/lib/configurator-data";

interface ShapeSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ShapeSelector({ selectedId, onSelect }: ShapeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {frameShapes.map((shape) => {
        const isSelected = shape.id === selectedId;
        return (
          <button
            key={shape.id}
            type="button"
            onClick={() => onSelect(shape.id)}
            aria-pressed={isSelected}
            className={`flex flex-col items-center gap-3 rounded-xl border-2 p-4 text-center transition-colors ${
              isSelected
                ? "border-brand-700 bg-brand-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <span
              className="h-8 w-12 border-4 border-gray-700"
              style={{ borderRadius: shape.borderRadius }}
            />
            <span>
              <span className="block text-sm font-semibold text-gray-900">
                {shape.name}
              </span>
              <span className="mt-0.5 block text-xs text-gray-500">
                {shape.priceModifier > 0 ? `+${shape.priceModifier} lei` : "Inclus"}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
