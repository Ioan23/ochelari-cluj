"use client";

import { useState } from "react";
import AppointmentsTable from "@/components/admin/AppointmentsTable";
import ClientsTable from "@/components/admin/ClientsTable";
import OrdersTable from "@/components/admin/OrdersTable";
import PrescriptionsTable from "@/components/admin/PrescriptionsTable";
import ReviewsTable from "@/components/admin/ReviewsTable";
import { appointments } from "@/lib/appointments-data";
import { clients } from "@/lib/clients-data";
import { orders, prescriptions } from "@/lib/admin-data";
import { reviews } from "@/lib/reviews-data";

type Tab = "comenzi" | "retete" | "recenzii" | "programari" | "clienti";

const pendingOrders = orders.filter(
  (order) => order.status === "in_asteptare" || order.status === "in_procesare"
).length;

const pendingPrescriptions = prescriptions.filter(
  (prescription) =>
    prescription.status === "noua" || prescription.status === "in_verificare"
).length;

const pendingReviews = reviews.filter(
  (review) => review.status === "in_asteptare"
).length;

const upcomingAppointments = appointments.filter(
  (appointment) =>
    appointment.status === "in_asteptare" || appointment.status === "confirmata"
).length;

const vipClients = clients.filter((client) => client.status === "vip").length;

const stats = [
  { label: "Comenzi totale", value: orders.length },
  { label: "Comenzi în lucru", value: pendingOrders },
  { label: "Rețete totale", value: prescriptions.length },
  { label: "Rețete în așteptare", value: pendingPrescriptions },
  { label: "Recenzii totale", value: reviews.length },
  { label: "Recenzii în așteptare", value: pendingReviews },
  { label: "Programări viitoare", value: upcomingAppointments },
  { label: "Clienți VIP", value: vipClients },
];

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "comenzi", label: "Comenzi" },
  { id: "retete", label: "Rețete" },
  { id: "recenzii", label: "Recenzii" },
  { id: "programari", label: "Programări" },
  { id: "clienti", label: "Clienți" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("comenzi");

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <p className="text-2xl font-bold text-brand-700">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 border-b border-gray-200">
        <nav className="flex gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-brand-700 text-brand-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === "comenzi" && <OrdersTable />}
        {activeTab === "retete" && <PrescriptionsTable />}
        {activeTab === "recenzii" && <ReviewsTable />}
        {activeTab === "programari" && <AppointmentsTable />}
        {activeTab === "clienti" && <ClientsTable />}
      </div>
    </div>
  );
}
