import { lensTypes } from "@/lib/configurator-data";

interface LensTypeSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function LensTypeSelector({ selectedId, onSelect }: LensTypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {lensTypes.map((lens) => {
        const isSelected = lens.id === selectedId;
        return (
          <button
            key={lens.id}
            type="button"
            onClick={() => onSelect(lens.id)}
            aria-pressed={isSelected}
            className={`flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-colors ${
              isSelected
                ? "border-brand-700 bg-brand-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <span
              className="mt-1 h-5 w-5 flex-shrink-0 rounded-full border border-gray-300"
              style={{ backgroundColor: lens.tint, opacity: 0.4 + lens.tintOpacity }}
            />
            <span className="flex-1">
              <span className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-gray-900">{lens.name}</span>
                <span className="whitespace-nowrap text-sm font-semibold text-brand-700">
                  {lens.price} lei
                </span>
              </span>
              <span className="mt-1 block text-xs text-gray-500">{lens.description}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
