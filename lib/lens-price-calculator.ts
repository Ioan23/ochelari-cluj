import { frameBasePrice, lensTypes } from "./configurator-data";

export interface LensIndexOption {
  id: string;
  name: string;
  index: number;
  description: string;
  priceModifier: number;
  /** Fraction (0-1) by which this index reduces the diopter thickness surcharge. */
  thicknessReduction: number;
  /** Maximum |diopter| this index is comfortably recommended for. */
  recommendedMaxDiopter: number;
}

export const lensIndexOptions: LensIndexOption[] = [
  {
    id: "1.50",
    name: "1.50 – Standard",
    index: 1.5,
    description: "Lentilă clasică, potrivită pentru dioptrii mici.",
    priceModifier: 0,
    thicknessReduction: 0,
    recommendedMaxDiopter: 2,
  },
  {
    id: "1.56",
    name: "1.56 – Subțire",
    index: 1.56,
    description: "Cu circa 20% mai subțire decât o lentilă standard.",
    priceModifier: 70,
    thicknessReduction: 0.2,
    recommendedMaxDiopter: 4,
  },
  {
    id: "1.67",
    name: "1.67 – Foarte subțire",
    index: 1.67,
    description: "Cu circa 35% mai subțire, recomandată pentru dioptrii medii-mari.",
    priceModifier: 160,
    thicknessReduction: 0.35,
    recommendedMaxDiopter: 6,
  },
  {
    id: "1.74",
    name: "1.74 – Ultra subțire",
    index: 1.74,
    description: "Cea mai subțire opțiune disponibilă, ideală pentru dioptrii mari.",
    priceModifier: 290,
    thicknessReduction: 0.5,
    recommendedMaxDiopter: Infinity,
  },
];

interface DiopterTier {
  maxDiopter: number;
  surcharge: number;
  label: string;
}

const diopterTiers: DiopterTier[] = [
  { maxDiopter: 2, surcharge: 0, label: "Dioptrii mici (până la ±2.00)" },
  { maxDiopter: 4, surcharge: 90, label: "Dioptrii medii (±2.25 – ±4.00)" },
  { maxDiopter: 6, surcharge: 200, label: "Dioptrii mari (±4.25 – ±6.00)" },
  { maxDiopter: Infinity, surcharge: 350, label: "Dioptrii foarte mari (peste ±6.00)" },
];

export function getDiopterTier(diopter: number): DiopterTier {
  const magnitude = Math.abs(diopter);
  return (
    diopterTiers.find((tier) => magnitude <= tier.maxDiopter) ??
    diopterTiers[diopterTiers.length - 1]
  );
}

export function recommendLensIndex(diopter: number): LensIndexOption {
  const magnitude = Math.abs(diopter);
  return (
    lensIndexOptions.find((option) => magnitude <= option.recommendedMaxDiopter) ??
    lensIndexOptions[lensIndexOptions.length - 1]
  );
}

export const opticLensBasePrice =
  lensTypes.find((lens) => lens.id === "transparent")?.price ?? 150;

export interface LensCostEstimate {
  tier: DiopterTier;
  thicknessSurcharge: number;
  indexModifier: number;
  lensPairTotal: number;
  totalEstimate: number;
  isIndexBelowRecommended: boolean;
  recommendedIndex: LensIndexOption;
}

export function estimateLensCost(
  diopter: number,
  lensIndex: LensIndexOption
): LensCostEstimate {
  const tier = getDiopterTier(diopter);
  const thicknessSurcharge = Math.round(tier.surcharge * (1 - lensIndex.thicknessReduction));
  const indexModifier = lensIndex.priceModifier;
  const lensPairTotal = opticLensBasePrice + thicknessSurcharge + indexModifier;
  const totalEstimate = frameBasePrice + lensPairTotal;
  const recommendedIndex = recommendLensIndex(diopter);
  const isIndexBelowRecommended = Math.abs(diopter) > lensIndex.recommendedMaxDiopter;

  return {
    tier,
    thicknessSurcharge,
    indexModifier,
    lensPairTotal,
    totalEstimate,
    isIndexBelowRecommended,
    recommendedIndex,
  };
}
