import { teamMembers } from "@/lib/team-data";

export default function TeamSection() {
  return (
    <section className="mt-16 border-t border-gray-200 pt-12">
      <h2 className="text-2xl font-bold text-gray-900">Echipa Noastră</h2>
      <p className="mt-2 text-base text-gray-600">
        Specialiști cu experiență în optică medicală, dedicați sănătății și
        confortului vizual al fiecărui client.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="flex flex-col rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-200"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-700 text-lg font-semibold text-white">
              {member.initials}
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {member.name}
            </h3>
            <p className="text-sm font-medium text-brand-700">{member.role}</p>
            <p className="mt-1 text-xs text-gray-500">
              {member.experienceYears}+ ani experiență în optică medicală
            </p>

            <p className="mt-4 flex-1 text-sm text-gray-600">{member.bio}</p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {member.specialties.map((specialty) => (
                <li
                  key={specialty}
                  className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
                >
                  {specialty}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
