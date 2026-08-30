import Link from "next/link";

const footerLinks = {
  produse: [
    { href: "/produse", label: "Toate Produsele" },
    { href: "/rame", label: "Rame Optice" },
    { href: "/rame", label: "Ochelari de Soare" },
    { href: "/lentile", label: "Lentile de Contact" },
  ],
  companie: [
    { href: "/despre", label: "Despre Noi" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container-padded py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-brand-700">Ochelari</span>
              <span className="text-xl font-light text-gray-500">Cluj</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-gray-600">
              Optică premium în inima Clujului. Venim cu soluții pentru fiecare
              nevoie vizuală.
            </p>
            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <p>Strada Eroilor 42, Cluj-Napoca</p>
              <p>
                <a href="tel:+40264123456" className="hover:text-brand-700">
                  +40 264 123 456
                </a>
              </p>
              <p>
                <a
                  href="mailto:contact@ochelaricluj.ro"
                  className="hover:text-brand-700"
                >
                  contact@ochelaricluj.ro
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Produse</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.produse.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900">Companie</h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.companie.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-brand-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900">Program</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>Luni – Vineri: 09:00 – 18:00</li>
                <li>Sâmbătă: 10:00 – 15:00</li>
                <li>Duminică: Închis</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Ochelari Cluj. Toate drepturile
            rezervate.
          </p>
        </div>
      </div>
    </footer>
  );
}
