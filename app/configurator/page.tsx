import type { Metadata } from "next";
import Configurator from "@/components/configurator/Configurator";

export const metadata: Metadata = {
  title: "Configurator",
  description:
    "Configurează-ți propriii ochelari: alege forma și culoarea ramei, tipul lentilelor și tratamentele dorite, cu preț actualizat în timp real.",
};

export default function ConfiguratorPage() {
  return (
    <div className="bg-white">
      <div className="container-padded py-16">
        <div className="mb-10 max-w-2xl">
          <h1 className="section-heading">Configurator Ochelari</h1>
          <p className="mt-4 text-lg text-gray-600">
            Personalizează-ți ochelarii pas cu pas și vezi prețul actualizat în timp
            real, înainte să soliciți o ofertă.
          </p>
        </div>

        <Configurator />
      </div>
    </div>
  );
}
