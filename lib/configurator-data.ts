export interface FrameShape {
  id: string;
  name: string;
  description: string;
  priceModifier: number;
  borderRadius: string;
}

export interface FrameColor {
  id: string;
  name: string;
  hex: string;
}

export interface LensType {
  id: string;
  name: string;
  description: string;
  price: number;
  tint: string;
  tintOpacity: number;
}

export interface LensOption {
  id: string;
  name: string;
  description: string;
  price: number;
}

export const frameBasePrice = 250;

export const frameShapes: FrameShape[] = [
  {
    id: "rotund",
    name: "Rotund",
    description: "Formă clasică, rotunjită, ideală pentru fețe pătrate.",
    priceModifier: 0,
    borderRadius: "9999px",
  },
  {
    id: "patrat",
    name: "Pătrat",
    description: "Linii drepte, aspect modern și îndrăzneț.",
    priceModifier: 20,
    borderRadius: "12px",
  },
  {
    id: "aviator",
    name: "Aviator",
    description: "Siluetă iconică, ușor picurată, potrivită oricărei fețe.",
    priceModifier: 40,
    borderRadius: "50% 50% 55% 55% / 65% 65% 35% 35%",
  },
  {
    id: "cat-eye",
    name: "Cat-Eye",
    description: "Colțuri exterioare ridicate, stil retro-șic.",
    priceModifier: 60,
    borderRadius: "10% 55% 40% 20%",
  },
];

export const frameColors: FrameColor[] = [
  { id: "negru", name: "Negru Mat", hex: "#1f2937" },
  { id: "havana", name: "Havana", hex: "#8b5a2b" },
  { id: "auriu", name: "Auriu", hex: "#c9a227" },
  { id: "argintiu", name: "Argintiu", hex: "#9ca3af" },
  { id: "tartaruga", name: "Roșu Tartaruga", hex: "#7c2d12" },
];

export const lensTypes: LensType[] = [
  {
    id: "transparent",
    name: "Transparent (optic)",
    description: "Lentile clare pentru corecție optică zilnică.",
    price: 150,
    tint: "#dbeafe",
    tintOpacity: 0.15,
  },
  {
    id: "soare",
    name: "Soare",
    description: "Protecție UV400 cu tentă închisă la culoare.",
    price: 220,
    tint: "#1e293b",
    tintOpacity: 0.75,
  },
  {
    id: "fotocromatic",
    name: "Fotocromatic",
    description: "Se închid automat la culoare în lumina soarelui.",
    price: 380,
    tint: "#7c8db5",
    tintOpacity: 0.45,
  },
  {
    id: "blue-light",
    name: "Filtru Lumină Albastră",
    description: "Reduce oboseala oculară cauzată de ecrane.",
    price: 190,
    tint: "#bfdbfe",
    tintOpacity: 0.25,
  },
];

export const lensOptions: LensOption[] = [
  {
    id: "anti-reflex",
    name: "Tratament Anti-Reflex",
    description: "Reduce reflexiile și îmbunătățește claritatea vizuală.",
    price: 90,
  },
  {
    id: "anti-zgarieturi",
    name: "Anti-Zgârieturi",
    description: "Strat de protecție împotriva zgârieturilor.",
    price: 60,
  },
  {
    id: "index-subtire",
    name: "Index Subțire 1.6",
    description: "Lentile mai subțiri și mai ușoare pentru dioptrii mari.",
    price: 150,
  },
  {
    id: "polarizare",
    name: "Polarizare",
    description: "Elimină strălucirea de pe suprafețe reflectorizante.",
    price: 130,
  },
];
