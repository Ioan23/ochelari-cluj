interface GlassesPreviewProps {
  frameColorHex: string;
  lensTint: string;
  lensTintOpacity: number;
  lensBorderRadius: string;
}

function hexToRgba(hex: string, opacity: number) {
  const value = hex.replace("#", "");
  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export default function GlassesPreview({
  frameColorHex,
  lensTint,
  lensTintOpacity,
  lensBorderRadius,
}: GlassesPreviewProps) {
  const lensStyle: React.CSSProperties = {
    borderColor: frameColorHex,
    backgroundColor: hexToRgba(lensTint, lensTintOpacity),
    borderRadius: lensBorderRadius,
  };

  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-gray-50">
      <div className="flex items-center">
        <span
          className="h-6 w-4 -rotate-[20deg] border-t-4"
          style={{ borderColor: frameColorHex }}
        />
        <div
          className="h-20 w-24 border-4 transition-colors duration-300 sm:h-24 sm:w-28"
          style={lensStyle}
        />
        <span
          className="mx-1 h-1 w-6 rounded-full transition-colors duration-300"
          style={{ backgroundColor: frameColorHex }}
        />
        <div
          className="h-20 w-24 border-4 transition-colors duration-300 sm:h-24 sm:w-28"
          style={lensStyle}
        />
        <span
          className="h-6 w-4 rotate-[20deg] border-t-4"
          style={{ borderColor: frameColorHex }}
        />
      </div>
    </div>
  );
}
