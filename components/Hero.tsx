import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      <div className="container-padded relative py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-800/50 px-4 py-1.5 text-xs font-medium text-brand-200 ring-1 ring-inset ring-brand-700">
            Nou în Cluj-Napoca
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Claritate perfectă,{" "}
            <span className="text-brand-300">stil personal</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-brand-200">
            Descoperiți colecția noastră de rame premium și beneficiați de
            consultanță optică profesională în centrul Clujului.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/produse"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-900 shadow-sm transition-colors hover:bg-brand-50"
            >
              Explorați Colecția
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-brand-400 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
            >
              Programează Consultație
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
