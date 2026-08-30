import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Administrare",
  description: "Panou intern pentru urmărirea comenzilor și a rețetelor.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <div className="bg-gray-50">
      <div className="container-padded py-16">
        <h1 className="section-heading">Panou de Administrare</h1>
        <p className="mt-4 text-lg text-gray-600">
          Urmărește comenzile clienților și rețetele optice încărcate.
        </p>

        <div className="mt-10">
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
}
