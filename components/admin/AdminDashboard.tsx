"use client";

import { useState } from "react";
import AppointmentsTable from "@/components/admin/AppointmentsTable";
import InvoicesTable from "@/components/admin/InvoicesTable";
import OrdersTable from "@/components/admin/OrdersTable";
import PrescriptionsTable from "@/components/admin/PrescriptionsTable";
import ReviewsTable from "@/components/admin/ReviewsTable";
import { appointments, invoices, orders, prescriptions } from "@/lib/admin-data";
import { formatCurrency } from "@/lib/invoicing";
import { reviews } from "@/lib/reviews-data";

type Tab = "comenzi" | "retete" | "recenzii" | "programari" | "facturi";

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

const pendingAppointments = appointments.filter(
  (appointment) => appointment.status === "in_asteptare"
).length;

const invoicedTotal = invoices
  .filter((invoice) => invoice.status === "emisa")
  .reduce((sum, invoice) => sum + invoice.total, 0);

const stats = [
  { label: "Comenzi totale", value: orders.length },
  { label: "Comenzi în lucru", value: pendingOrders },
  { label: "Rețete totale", value: prescriptions.length },
  { label: "Rețete în așteptare", value: pendingPrescriptions },
  { label: "Recenzii totale", value: reviews.length },
  { label: "Recenzii în așteptare", value: pendingReviews },
  { label: "Programări totale", value: appointments.length },
  { label: "Programări în așteptare", value: pendingAppointments },
  { label: "Facturi emise", value: invoices.length },
  { label: "Valoare facturată", value: formatCurrency(invoicedTotal) },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("comenzi");

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
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
        <nav className="flex gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("comenzi")}
            className={`border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${
              activeTab === "comenzi"
                ? "border-brand-700 text-brand-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Comenzi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("retete")}
            className={`border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${
              activeTab === "retete"
                ? "border-brand-700 text-brand-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Rețete
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("recenzii")}
            className={`border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${
              activeTab === "recenzii"
                ? "border-brand-700 text-brand-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Recenzii
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("programari")}
            className={`border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${
              activeTab === "programari"
                ? "border-brand-700 text-brand-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Programări
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("facturi")}
            className={`border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${
              activeTab === "facturi"
                ? "border-brand-700 text-brand-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Facturi
          </button>
        </nav>
      </div>

      <div className="mt-6">
        {activeTab === "comenzi" && <OrdersTable />}
        {activeTab === "retete" && <PrescriptionsTable />}
        {activeTab === "recenzii" && <ReviewsTable />}
        {activeTab === "programari" && <AppointmentsTable />}
        {activeTab === "facturi" && <InvoicesTable />}
      </div>
    </div>
  );
}
