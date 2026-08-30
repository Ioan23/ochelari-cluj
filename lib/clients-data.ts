export type ClientStatus = "activ" | "vip" | "inactiv";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  lastVisit: string;
  totalOrders: number;
  totalSpent: number;
  status: ClientStatus;
}

export const clientStatusLabels: Record<ClientStatus, string> = {
  activ: "Activ",
  vip: "VIP",
  inactiv: "Inactiv",
};

export const clientStatusStyles: Record<ClientStatus, string> = {
  activ: "bg-green-100 text-green-800",
  vip: "bg-gold-400/10 text-gold-600",
  inactiv: "bg-gray-100 text-gray-600",
};

export const clients: Client[] = [
  {
    id: "CLI-1001",
    name: "Andrei Pop",
    email: "andrei.pop@example.ro",
    phone: "+40 745 123 456",
    joinDate: "2025-03-14",
    lastVisit: "2026-08-28",
    totalOrders: 3,
    totalSpent: 2140,
    status: "vip",
  },
  {
    id: "CLI-1002",
    name: "Maria Ionescu",
    email: "maria.ionescu@example.ro",
    phone: "+40 722 987 654",
    joinDate: "2025-06-02",
    lastVisit: "2026-08-27",
    totalOrders: 2,
    totalSpent: 1670,
    status: "activ",
  },
  {
    id: "CLI-1003",
    name: "Radu Vasilescu",
    email: "radu.vasilescu@example.ro",
    phone: "+40 731 456 789",
    joinDate: "2024-11-20",
    lastVisit: "2026-08-25",
    totalOrders: 5,
    totalSpent: 3120,
    status: "vip",
  },
  {
    id: "CLI-1004",
    name: "Ioana Dumitru",
    email: "ioana.dumitru@example.ro",
    phone: "+40 755 321 654",
    joinDate: "2025-09-08",
    lastVisit: "2026-08-22",
    totalOrders: 1,
    totalSpent: 890,
    status: "activ",
  },
  {
    id: "CLI-1005",
    name: "Cristian Moldovan",
    email: "cristian.moldovan@example.ro",
    phone: "+40 733 654 321",
    joinDate: "2025-01-30",
    lastVisit: "2026-08-24",
    totalOrders: 2,
    totalSpent: 1560,
    status: "activ",
  },
  {
    id: "CLI-1006",
    name: "Elena Georgescu",
    email: "elena.georgescu@example.ro",
    phone: "+40 744 987 123",
    joinDate: "2024-05-17",
    lastVisit: "2026-02-11",
    totalOrders: 4,
    totalSpent: 2980,
    status: "inactiv",
  },
  {
    id: "CLI-1007",
    name: "Larisa Nistor",
    email: "larisa.nistor@example.ro",
    phone: "+40 721 234 567",
    joinDate: "2026-01-05",
    lastVisit: "2026-08-20",
    totalOrders: 1,
    totalSpent: 405,
    status: "activ",
  },
];
