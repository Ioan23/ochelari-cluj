import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactați-ne pentru programări, informații despre produse sau orice altă întrebare.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <div className="container-padded py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="section-heading">Contactați-ne</h1>
          <p className="mt-4 text-lg text-gray-600">
            Suntem disponibili pentru orice întrebare sau programare.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Informații de Contact
              </h2>
              <dl className="mt-6 space-y-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Adresă</dt>
                  <dd className="mt-1 text-base text-gray-900">
                    Strada Eroilor 42, Cluj-Napoca 400129
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Telefon</dt>
                  <dd className="mt-1 text-base text-gray-900">
                    <a href="tel:+40264123456" className="hover:text-brand-700">
                      +40 264 123 456
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-base text-gray-900">
                    <a
                      href="mailto:contact@ochelaricluj.ro"
                      className="hover:text-brand-700"
                    >
                      contact@ochelaricluj.ro
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">
                    Program
                  </dt>
                  <dd className="mt-1 space-y-1 text-base text-gray-900">
                    <p>Luni – Vineri: 09:00 – 18:00</p>
                    <p>Sâmbătă: 10:00 – 15:00</p>
                    <p>Duminică: Închis</p>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Trimite un Mesaj
              </h2>
              <form className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nume
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
                    placeholder="Numele dvs."
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
                    placeholder="email@exemplu.ro"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 shadow-sm focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
                    placeholder="Cum vă putem ajuta?"
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Trimite Mesaj
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
