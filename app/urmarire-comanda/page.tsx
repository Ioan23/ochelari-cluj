import type { Metadata } from "next";
import OrderTrackingLookup from "@/components/OrderTrackingLookup";

export const metadata: Metadata = {
  title: "Urmărire Comandă",
  description:
    "Verificați statusul comenzii dumneavoastră introducând numărul de telefon sau codul unic al comenzii.",
  alternates: {
    canonical: "/urmarire-comanda",
  },
};

export default function UrmarireComandaPage() {
  return (
    <div className="bg-white">
      <div className="container-padded py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="section-heading">Urmărire Comandă</h1>
          <p className="mt-4 text-lg text-gray-600">
            Introduceți numărul de telefon folosit la comandă sau codul unic
            al comenzii (ex: CMD-1042) pentru a vedea stadiul acesteia.
          </p>

          <div className="mt-10">
            <OrderTrackingLookup />
          </div>
        </div>
      </div>
    </div>
  );
}
