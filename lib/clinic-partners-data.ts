export interface ClinicPartner {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  services: string[];
}

export const clinicPartners: ClinicPartner[] = [
  {
    id: "oftalmo-clinic-cluj",
    name: "OftalmoClinic Cluj",
    description:
      "Clinică de referință în chirurgia oftalmologică, cu care colaborăm pentru controale complete și trimiteri rapide ale pacienților.",
    address: "Str. Republicii 21, Cluj-Napoca",
    phone: "+40 264 111 222",
    services: ["Consultații oftalmologice", "Chirurgie refractivă", "Tratament glaucom"],
  },
  {
    id: "centrul-de-ochi-transilvania",
    name: "Centrul de Ochi Transilvania",
    description:
      "Pacienții Ochelari Cluj beneficiază de programări prioritare pentru control oftalmologic anual și investigații de fund de ochi.",
    address: "Bd. 21 Decembrie 1989 nr. 77, Cluj-Napoca",
    phone: "+40 264 333 444",
    services: ["Control anual de vedere", "Fund de ochi", "Tonometrie"],
  },
  {
    id: "clinica-oculus-manastur",
    name: "Clinica Oculus Mănăștur",
    description:
      "Parteneriat dedicat pacienților din zona Mănăștur, cu recomandări reciproce pentru rețete actualizate și corecții optice.",
    address: "Str. Alexandru Vaida Voevod 53, Cluj-Napoca",
    phone: "+40 264 555 666",
    services: ["Actualizare rețetă", "Consultații copii", "Lentile de contact"],
  },
];
