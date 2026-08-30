export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  bio: string;
  specialties: string[];
  initials: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "andreea-pop",
    name: "Andreea Pop",
    role: "Optometrist Principal",
    experienceYears: 18,
    bio: "Coordonează consultațiile de vedere și corecțiile optice complexe, cu o carieră dedicată sănătății vizuale a clujenilor încă din 2008.",
    specialties: ["Refracție avansată", "Lentile de contact", "Vedere la copii"],
    initials: "AP",
  },
  {
    id: "mihai-rusu",
    name: "Mihai Rusu",
    role: "Optician Master",
    experienceYears: 15,
    bio: "Specialist în montarea și ajustarea ramelor de precizie, asigură că fiecare pereche de ochelari se potrivește perfect nevoilor clientului.",
    specialties: ["Montaj lentile", "Ajustare rame", "Lentile progresive"],
    initials: "MR",
  },
  {
    id: "ioana-florea",
    name: "Ioana Florea",
    role: "Specialist Lentile de Contact",
    experienceYears: 10,
    bio: "Ghidează pacienții în alegerea și adaptarea lentilelor de contact, de la primele fitări până la soluții pentru ochi sensibili.",
    specialties: ["Fitare lentile de contact", "Ochi sensibili", "Consiliere clienți"],
    initials: "IF",
  },
  {
    id: "radu-toma",
    name: "Radu Toma",
    role: "Manager Magazin",
    experienceYears: 12,
    bio: "Supraveghează operațiunile zilnice și relația cu partenerii oftalmologici, garantând un parcurs fără cusur pentru fiecare client.",
    specialties: ["Relații clinici partenere", "Garanții și retur", "Service clienți"],
    initials: "RT",
  },
];
