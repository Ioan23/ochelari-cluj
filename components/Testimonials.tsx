const testimonials = [
  {
    name: "Maria Ionescu",
    role: "Client fidel",
    text: "Servicii impecabile! Am găsit ramele perfecte cu ajutorul consultantului optic. Recomand cu drag.",
    rating: 5,
  },
  {
    name: "Alexandru Pop",
    role: "Client",
    text: "Cea mai bună optică din Cluj. Prețuri corecte, personal amabil și ochelarii gata în timp record.",
    rating: 5,
  },
  {
    name: "Elena Mureșan",
    role: "Client",
    text: "Am venit cu o rețetă complicată și au rezolvat totul profesional. Lentilele progresive sunt perfecte.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="container-padded">
        <div className="text-center">
          <h2 className="section-heading">Ce Spun Clienții Noștri</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-200"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-gold-400 text-lg">★</span>
                ))}
              </div>
              <p className="mt-4 flex-1 text-base text-gray-700 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-6 border-t border-gray-200 pt-4">
                <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
