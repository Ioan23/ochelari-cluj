import { clinicPartners } from "@/lib/clinic-partners-data";

export default function ClinicPartners() {
  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <h2 className="text-2xl font-bold text-gray-900">
        Parteneriate cu Clinici Oftalmologice
      </h2>
      <p className="mt-2 text-base text-gray-600">
        Colaborăm cu clinici oftalmologice locale pentru a vă oferi acces
        facil la controale medicale complete și rețete actualizate.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {clinicPartners.map((clinic) => (
          <div
            key={clinic.id}
            className="flex flex-col rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-200"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {clinic.name}
            </h3>
            <p className="mt-2 flex-1 text-sm text-gray-600">
              {clinic.description}
            </p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {clinic.services.map((service) => (
                <li
                  key={service}
                  className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
                >
                  {service}
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-gray-200 pt-4 text-sm text-gray-600">
              <p>{clinic.address}</p>
              <a
                href={`tel:${clinic.phone.replace(/\s+/g, "")}`}
                className="mt-1 inline-block font-medium text-brand-700 hover:text-brand-800"
              >
                {clinic.phone}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
