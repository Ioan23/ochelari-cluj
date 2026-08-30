export type ReviewStatus = "in_asteptare" | "aprobata" | "respinsa";

export interface Review {
  id: string;
  customerName: string;
  email: string;
  rating: number;
  productName?: string;
  text: string;
  photoEmoji?: string;
  date: string;
  status: ReviewStatus;
}

export const reviewStatusLabels: Record<ReviewStatus, string> = {
  in_asteptare: "În așteptare",
  aprobata: "Aprobată",
  respinsa: "Respinsă",
};

export const reviewStatusStyles: Record<ReviewStatus, string> = {
  in_asteptare: "bg-yellow-100 text-yellow-800",
  aprobata: "bg-green-100 text-green-800",
  respinsa: "bg-red-100 text-red-800",
};

export const reviews: Review[] = [
  {
    id: "REV-3010",
    customerName: "Maria Ionescu",
    email: "maria.ionescu@example.ro",
    rating: 5,
    productName: "Oversized Frame",
    text: "Servicii impecabile! Am găsit ramele perfecte cu ajutorul consultantului optic. Recomand cu drag.",
    photoEmoji: "👓",
    date: "2026-08-20",
    status: "aprobata",
  },
  {
    id: "REV-3009",
    customerName: "Alexandru Pop",
    email: "alexandru.pop@example.ro",
    rating: 5,
    productName: "Aviator Classic",
    text: "Cea mai bună optică din Cluj. Prețuri corecte, personal amabil și ochelarii gata în timp record.",
    photoEmoji: "🕶️",
    date: "2026-08-18",
    status: "aprobata",
  },
  {
    id: "REV-3008",
    customerName: "Elena Mureșan",
    email: "elena.muresan@example.ro",
    rating: 5,
    productName: "New Wayfarer",
    text: "Am venit cu o rețetă complicată și au rezolvat totul profesional. Lentilele progresive sunt perfecte.",
    date: "2026-08-15",
    status: "aprobata",
  },
  {
    id: "REV-3007",
    customerName: "Radu Vasilescu",
    email: "radu.vasilescu@example.ro",
    rating: 4,
    productName: "Biofinity Monthly",
    text: "Confortabile și livrare rapidă. Aș fi vrut mai multe opțiuni de cutii, dar per total sunt mulțumit.",
    photoEmoji: "👁️",
    date: "2026-08-11",
    status: "aprobata",
  },
  {
    id: "REV-3006",
    customerName: "Ioana Dumitru",
    email: "ioana.dumitru@example.ro",
    rating: 5,
    productName: "Conceptual",
    text: "Rama Prada arată exact ca în magazin, iar ajustarea a fost gratuită și rapidă.",
    photoEmoji: "👓",
    date: "2026-08-09",
    status: "aprobata",
  },
  {
    id: "REV-3005",
    customerName: "Cristian Moldovan",
    email: "cristian.moldovan@example.ro",
    rating: 3,
    productName: "Holbrook",
    text: "Ochelarii sunt buni, dar am așteptat cu o zi mai mult decât mi s-a promis inițial.",
    date: "2026-08-05",
    status: "in_asteptare",
  },
  {
    id: "REV-3004",
    customerName: "Simona Bălan",
    email: "simona.balan@example.ro",
    rating: 2,
    productName: "Classic Round",
    text: "Rama a ajuns cu o zgârietură vizibilă pe lentilă. Aștept un răspuns de la echipa de suport.",
    date: "2026-08-02",
    status: "in_asteptare",
  },
  {
    id: "REV-3003",
    customerName: "Vlad Toma",
    email: "vlad.toma@example.ro",
    rating: 1,
    text: "Recenzie postată din greșeală pentru alt magazin.",
    date: "2026-07-29",
    status: "respinsa",
  },
];
