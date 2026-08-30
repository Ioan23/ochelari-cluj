export interface Product {
  id: string;
  name: string;
  brand?: string;
  category: string;
  price: number;
  inStock: boolean;
  emoji: string;
  description?: string;
}

export const products: Product[] = [
  {
    id: "rb-3025",
    name: "Aviator Classic",
    brand: "Ray-Ban",
    category: "Ochelari de soare",
    price: 650,
    inStock: true,
    emoji: "🕶️",
    description: "Clasicul aviator cu lentile verzi G-15 și rama aurie.",
  },
  {
    id: "gg-0396",
    name: "Oversized Frame",
    brand: "Gucci",
    category: "Rame optice",
    price: 1250,
    inStock: true,
    emoji: "👓",
    description: "Ramă oversized cu detalii logo emblematice.",
  },
  {
    id: "ok-holbrook",
    name: "Holbrook",
    brand: "Oakley",
    category: "Ochelari de soare",
    price: 780,
    inStock: true,
    emoji: "🕶️",
    description: "Design sport cu lentile Prizm pentru claritate maximă.",
  },
  {
    id: "pr-56ws",
    name: "Conceptual",
    brand: "Prada",
    category: "Rame optice",
    price: 990,
    inStock: true,
    emoji: "👓",
    description: "Design minimalist italian cu detalii geometrice.",
  },
  {
    id: "lc-acuvue",
    name: "Acuvue Oasys 1-Day",
    brand: "Johnson & Johnson",
    category: "Lentile de contact",
    price: 185,
    inStock: true,
    emoji: "👁️",
    description: "Lentile zilnice cu tehnologie HydraLuxe.",
  },
  {
    id: "lc-biofinity",
    name: "Biofinity Monthly",
    brand: "CooperVision",
    category: "Lentile de contact",
    price: 220,
    inStock: true,
    emoji: "👁️",
    description: "Lentile lunare cu material Aquaform pentru confort toată ziua.",
  },
  {
    id: "hb-classic",
    name: "Classic Round",
    brand: "Hackett",
    category: "Rame optice",
    price: 480,
    inStock: false,
    emoji: "👓",
    description: "Ramă rotundă în stil retro, fabricată din acetat.",
  },
  {
    id: "rb-wayfarer",
    name: "New Wayfarer",
    brand: "Ray-Ban",
    category: "Rame optice",
    price: 720,
    inStock: true,
    emoji: "👓",
    description: "Iconicul Wayfarer reinventat pentru confort modern.",
  },
];
