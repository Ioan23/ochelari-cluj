import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Comandă Anulată",
  description: "Plata a fost anulată.",
};

export default function ComandaAnulataPage() {
  return (
    <div className="bg-white">
      <div className="container-padded py-24 text-center">
        <div className="mx-auto max-w-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
            ✕
          </div>
          <h1 className="section-heading mt-6">Plata a fost anulată</h1>
          <p className="mt-4 text-lg text-gray-600">
            Comanda dvs. nu a fost finalizată. Nicio sumă nu a fost debitată.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/produse" className="btn-primary">
              Înapoi la produse
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contactează-ne
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
