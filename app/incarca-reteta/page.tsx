import type { Metadata } from "next";
import PrescriptionUpload from "@/components/PrescriptionUpload";

export const metadata: Metadata = {
  title: "Încarcă Rețeta",
  description:
    "Încarcă o fotografie sau un scan al rețetei tale optice și un consultant te va contacta pentru a finaliza comanda.",
};

export default function IncarcaRetetaPage() {
  return (
    <div className="bg-white">
      <div className="container-padded py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="section-heading">Încarcă Rețeta Optică</h1>
          <p className="mt-4 text-lg text-gray-600">
            Ai deja o rețetă de la medicul oftalmolog sau optometrist? Încarc-o
            aici, împreună cu datele tale de contact, iar echipa noastră te va
            contacta pentru a alege rama și lentilele potrivite.
          </p>

          <div className="mt-10">
            <PrescriptionUpload />
          </div>
        </div>
      </div>
    </div>
  );
}
