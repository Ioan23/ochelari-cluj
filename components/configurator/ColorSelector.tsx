import { frameColors } from "@/lib/configurator-data";

interface ColorSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ColorSelector({ selectedId, onSelect }: ColorSelectorProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {frameColors.map((color) => {
        const isSelected = color.id === selectedId;
        return (
          <button
            key={color.id}
            type="button"
            onClick={() => onSelect(color.id)}
            aria-pressed={isSelected}
            aria-label={color.name}
            title={color.name}
            className={`flex flex-col items-center gap-2 rounded-lg p-2 transition-colors ${
              isSelected ? "ring-2 ring-brand-700 ring-offset-2" : ""
            }`}
          >
            <span
              className="h-9 w-9 rounded-full border border-gray-300 shadow-sm"
              style={{ backgroundColor: color.hex }}
            />
            <span className="text-xs font-medium text-gray-600">{color.name}</span>
          </button>
        );
      })}
    </div>
  );
}
