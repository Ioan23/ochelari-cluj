import Link from "next/link";

const categories = [
  {
    title: "Rame Optice",
    description: "Colecții exclusive din Europa și Asia",
    href: "/rame",
    icon: "👓",
    count: "120+ modele",
  },
  {
    title: "Ochelari de Soare",
    description: "Protecție UV400 cu stil desăvârșit",
    href: "/rame",
    icon: "🕶️",
    count: "80+ modele",
  },
  {
    title: "Lentile de Contact",
    description: "Lentile zilnice, lunare și multifocale",
    href: "/lentile",
    icon: "👁️",
    count: "Toate brandurile",
  },
  {
    title: "Lentile Optice",
    description: "Monofocale, progresive, anti-reflex",
    href: "/lentile",
    icon: "🔍",
    count: "Premium quality",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container-padded">
        <div className="text-center">
          <h2 className="section-heading">Categorii Principale</h2>
          <p className="mt-4 text-lg text-gray-600">
            Tot ce aveți nevoie pentru o vedere perfectă
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:ring-2 hover:ring-brand-500 hover:shadow-md"
            >
              <span className="text-4xl">{cat.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-brand-700">
                {cat.title}
              </h3>
              <p className="mt-1 flex-1 text-sm text-gray-600">
                {cat.description}
              </p>
              <p className="mt-4 text-xs font-medium text-brand-600">
                {cat.count} →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
