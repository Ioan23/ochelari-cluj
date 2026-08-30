export type AppointmentStatus =
  | "in_asteptare"
  | "confirmata"
  | "finalizata"
  | "anulata";

export type AppointmentType =
  | "control_oftalmologic"
  | "ajustare_rame"
  | "consultatie_lentile"
  | "consultatie_domiciliu";

export interface Appointment {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  type: AppointmentType;
  date: string;
  time: string;
  notes?: string;
  status: AppointmentStatus;
}

export const appointmentStatusLabels: Record<AppointmentStatus, string> = {
  in_asteptare: "În așteptare",
  confirmata: "Confirmată",
  finalizata: "Finalizată",
  anulata: "Anulată",
};

export const appointmentStatusStyles: Record<AppointmentStatus, string> = {
  in_asteptare: "bg-yellow-100 text-yellow-800",
  confirmata: "bg-blue-100 text-blue-800",
  finalizata: "bg-green-100 text-green-800",
  anulata: "bg-red-100 text-red-800",
};

export const appointmentTypeLabels: Record<AppointmentType, string> = {
  control_oftalmologic: "Control oftalmologic",
  ajustare_rame: "Ajustare rame",
  consultatie_lentile: "Consultație lentile",
  consultatie_domiciliu: "Consultație la domiciliu",
};

export const appointments: Appointment[] = [
  {
    id: "PRG-4012",
    customerName: "Andrei Pop",
    email: "andrei.pop@example.ro",
    phone: "+40 745 123 456",
    type: "control_oftalmologic",
    date: "2026-09-02",
    time: "10:00",
    notes: "Prima programare, aduce rețeta veche.",
    status: "confirmata",
  },
  {
    id: "PRG-4011",
    customerName: "Maria Ionescu",
    email: "maria.ionescu@example.ro",
    phone: "+40 722 987 654",
    type: "ajustare_rame",
    date: "2026-09-01",
    time: "14:30",
    status: "in_asteptare",
  },
  {
    id: "PRG-4010",
    customerName: "Radu Vasilescu",
    email: "radu.vasilescu@example.ro",
    phone: "+40 731 456 789",
    type: "consultatie_lentile",
    date: "2026-08-29",
    time: "09:15",
    notes: "Interesat de lentile de contact lunare.",
    status: "confirmata",
  },
  {
    id: "PRG-4009",
    customerName: "Elena Georgescu",
    email: "elena.georgescu@example.ro",
    phone: "+40 744 987 123",
    type: "consultatie_domiciliu",
    date: "2026-08-27",
    time: "16:00",
    notes: "Persoană cu mobilitate redusă, etaj 2 fără lift.",
    status: "finalizata",
  },
  {
    id: "PRG-4008",
    customerName: "Cristian Moldovan",
    email: "cristian.moldovan@example.ro",
    phone: "+40 733 654 321",
    type: "control_oftalmologic",
    date: "2026-08-24",
    time: "11:45",
    status: "finalizata",
  },
  {
    id: "PRG-4007",
    customerName: "Larisa Nistor",
    email: "larisa.nistor@example.ro",
    phone: "+40 721 234 567",
    type: "ajustare_rame",
    date: "2026-08-20",
    time: "13:00",
    notes: "A anulat telefonic.",
    status: "anulata",
  },
];
