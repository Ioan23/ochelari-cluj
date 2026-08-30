import Link from "next/link";

export default function ContactBanner() {
  return (
    <section className="bg-brand-800 py-16">
      <div className="container-padded text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Programați o consultație gratuită
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-brand-200">
          Optometriștii noștri vă stau la dispoziție pentru un control oftalmologic
          complet și sfaturi personalizate.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-900 shadow-sm transition-colors hover:bg-brand-50"
          >
            Contactați-ne
          </Link>
          <a
            href="tel:+40264123456"
            className="rounded-lg border border-brand-400 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            +40 264 123 456
          </a>
        </div>
      </div>
    </section>
  );
}
