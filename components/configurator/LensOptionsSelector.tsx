import { lensOptions } from "@/lib/configurator-data";

interface LensOptionsSelectorProps {
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export default function LensOptionsSelector({
  selectedIds,
  onToggle,
}: LensOptionsSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {lensOptions.map((option) => {
        const isSelected = selectedIds.includes(option.id);
        return (
          <label
            key={option.id}
            className={`flex touch-manipulation cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-colors active:scale-[0.98] ${
              isSelected
                ? "border-brand-700 bg-brand-50"
                : "border-gray-200 bg-white active:border-gray-300 sm:hover:border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggle(option.id)}
              className="mt-1 h-5 w-5 flex-shrink-0 rounded border-gray-300 text-brand-700 focus:ring-brand-700"
            />
            <span className="flex-1">
              <span className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-gray-900">
                  {option.name}
                </span>
                <span className="whitespace-nowrap text-sm font-semibold text-brand-700">
                  +{option.price} lei
                </span>
              </span>
              <span className="mt-1 block text-xs text-gray-500">
                {option.description}
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}
