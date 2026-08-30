"use client";

import { useMemo, useState } from "react";
import {
  type Appointment,
  type AppointmentStatus,
  appointmentStatusLabels,
  appointmentStatusStyles,
  appointments as initialAppointments,
} from "@/lib/admin-data";

const statusFilters: Array<AppointmentStatus | "toate"> = [
  "toate",
  "in_asteptare",
  "confirmata",
  "anulata",
];

function NotificationBadge({ sent, label }: { sent: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
        sent ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"
      }`}
    >
      {sent ? "✓" : "✗"} {label}
    </span>
  );
}

export default function AppointmentsTable() {
  const [appointments, setAppointments] = useState<Appointment[]>(
    initialAppointments
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    AppointmentStatus | "toate"
  >("toate");

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const matchesStatus =
        statusFilter === "toate" || appointment.status === statusFilter;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        appointment.customerName.toLowerCase().includes(query) ||
        appointment.id.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [appointments, search, statusFilter]);

  function handleStatusChange(
    appointmentId: string,
    status: AppointmentStatus
  ) {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === appointmentId ? { ...appointment, status } : appointment
      )
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Caută după nume sau nr. programare..."
          className="w-full max-w-sm rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
        />
        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as AppointmentStatus | "toate")
          }
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
        >
          {statusFilters.map((status) => (
            <option key={status} value={status}>
              {status === "toate"
                ? "Toate statusurile"
                : appointmentStatusLabels[status]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Programare
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Client
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Adresă
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Data / Ora
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Notificări
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                  {appointment.id}
                </td>
                <td className="px-4 py-3">
                  <div className="text-gray-900">{appointment.customerName}</div>
                  <div className="text-xs text-gray-500">{appointment.email}</div>
                  <div className="text-xs text-gray-500">{appointment.phone}</div>
                </td>
                <td className="max-w-xs px-4 py-3 text-gray-700">
                  {appointment.address}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                  {appointment.date} · {appointment.time}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-1">
                    <NotificationBadge sent={appointment.emailSent} label="Email" />
                    <NotificationBadge sent={appointment.smsSent} label="SMS" />
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <select
                    value={appointment.status}
                    onChange={(event) =>
                      handleStatusChange(
                        appointment.id,
                        event.target.value as AppointmentStatus
                      )
                    }
                    className={`rounded-full border-0 px-3 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-700 ${appointmentStatusStyles[appointment.status]}`}
                  >
                    {Object.entries(appointmentStatusLabels).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                </td>
              </tr>
            ))}
            {filteredAppointments.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  Nu există programări care să corespundă filtrelor selectate.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
