const features = [
  {
    title: "Consultanță Gratuită",
    description:
      "Optometriști certificați vă ajută să alegeți soluția perfectă pentru vederea dumneavoastră.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Mărci Premium",
    description:
      "Colaborăm cu branduri de top: Ray-Ban, Oakley, Prada, Gucci și multe altele.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "Garanție 2 Ani",
    description:
      "Toate produsele vin cu garanție de 2 ani. Reparăm sau înlocuim fără costuri suplimentare.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Livrare Rapidă",
    description:
      "Ochelarii cu lentile sunt gata în 24-48 ore. Lentilele de contact se livrează la domiciliu.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function WhyUs() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container-padded">
        <div className="text-center">
          <h2 className="section-heading">De Ce Să Ne Alegeți</h2>
          <p className="mt-4 text-lg text-gray-600">
            Experiența noastră, în serviciul vederii dumneavoastră
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-white">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
