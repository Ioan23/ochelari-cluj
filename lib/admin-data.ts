export type OrderStatus =
  | "in_asteptare"
  | "in_procesare"
  | "expediata"
  | "livrata"
  | "anulata";

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  items: string[];
  total: number;
  date: string;
  status: OrderStatus;
}

export const orderStatusLabels: Record<OrderStatus, string> = {
  in_asteptare: "În așteptare",
  in_procesare: "În procesare",
  expediata: "Expediată",
  livrata: "Livrată",
  anulata: "Anulată",
};

export const orderStatusStyles: Record<OrderStatus, string> = {
  in_asteptare: "bg-yellow-100 text-yellow-800",
  in_procesare: "bg-blue-100 text-blue-800",
  expediata: "bg-purple-100 text-purple-800",
  livrata: "bg-green-100 text-green-800",
  anulata: "bg-red-100 text-red-800",
};

export const orders: Order[] = [
  {
    id: "CMD-1042",
    customerName: "Andrei Pop",
    email: "andrei.pop@example.ro",
    phone: "+40 745 123 456",
    items: ["Aviator Classic", "Lentile antireflex"],
    total: 780,
    date: "2026-08-28",
    status: "in_asteptare",
  },
  {
    id: "CMD-1041",
    customerName: "Maria Ionescu",
    email: "maria.ionescu@example.ro",
    phone: "+40 722 987 654",
    items: ["Oversized Frame"],
    total: 1250,
    date: "2026-08-27",
    status: "in_procesare",
  },
  {
    id: "CMD-1040",
    customerName: "Radu Vasilescu",
    email: "radu.vasilescu@example.ro",
    phone: "+40 731 456 789",
    items: ["Acuvue Oasys 1-Day", "Biofinity Monthly"],
    total: 405,
    date: "2026-08-25",
    status: "expediata",
  },
  {
    id: "CMD-1039",
    customerName: "Ioana Dumitru",
    email: "ioana.dumitru@example.ro",
    phone: "+40 755 321 654",
    items: ["New Wayfarer", "Lentile fotocromatice"],
    total: 890,
    date: "2026-08-22",
    status: "livrata",
  },
  {
    id: "CMD-1038",
    customerName: "Cristian Moldovan",
    email: "cristian.moldovan@example.ro",
    phone: "+40 733 654 321",
    items: ["Holbrook"],
    total: 780,
    date: "2026-08-20",
    status: "livrata",
  },
  {
    id: "CMD-1037",
    customerName: "Elena Georgescu",
    email: "elena.georgescu@example.ro",
    phone: "+40 744 987 123",
    items: ["Conceptual"],
    total: 990,
    date: "2026-08-18",
    status: "anulata",
  },
];

export type PrescriptionStatus =
  | "noua"
  | "in_verificare"
  | "procesata"
  | "respinsa";

export interface Prescription {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  notes?: string;
  fileName: string;
  fileType: "image" | "pdf";
  date: string;
  status: PrescriptionStatus;
}

export const prescriptionStatusLabels: Record<PrescriptionStatus, string> = {
  noua: "Nouă",
  in_verificare: "În verificare",
  procesata: "Procesată",
  respinsa: "Respinsă",
};

export const prescriptionStatusStyles: Record<PrescriptionStatus, string> = {
  noua: "bg-blue-100 text-blue-800",
  in_verificare: "bg-yellow-100 text-yellow-800",
  procesata: "bg-green-100 text-green-800",
  respinsa: "bg-red-100 text-red-800",
};

export const prescriptions: Prescription[] = [
  {
    id: "RET-2031",
    customerName: "Andrei Pop",
    email: "andrei.pop@example.ro",
    phone: "+40 745 123 456",
    notes: "Rețetă de la control anual, doresc rame subțiri.",
    fileName: "reteta_andrei_pop.pdf",
    fileType: "pdf",
    date: "2026-08-28",
    status: "noua",
  },
  {
    id: "RET-2030",
    customerName: "Larisa Nistor",
    email: "larisa.nistor@example.ro",
    phone: "+40 721 234 567",
    notes: "",
    fileName: "reteta_larisa.jpg",
    fileType: "image",
    date: "2026-08-26",
    status: "in_verificare",
  },
  {
    id: "RET-2029",
    customerName: "Mihai Constantin",
    email: "mihai.constantin@example.ro",
    phone: "+40 762 345 678",
    notes: "Are nevoie de lentile progresive.",
    fileName: "reteta_mihai_c.png",
    fileType: "image",
    date: "2026-08-24",
    status: "procesata",
  },
  {
    id: "RET-2028",
    customerName: "Simona Bălan",
    email: "simona.balan@example.ro",
    phone: "+40 728 456 123",
    notes: "Fotografie neclară, se cere retrimitere.",
    fileName: "reteta_simona.jpg",
    fileType: "image",
    date: "2026-08-21",
    status: "respinsa",
  },
  {
    id: "RET-2027",
    customerName: "Vlad Toma",
    email: "vlad.toma@example.ro",
    phone: "+40 748 567 890",
    notes: "",
    fileName: "reteta_vlad_toma.pdf",
    fileType: "pdf",
    date: "2026-08-19",
    status: "procesata",
  },
];
