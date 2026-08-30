import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = "https://ochelaricluj.ro";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ochelari Cluj | Optică și Consultații Optice în Cluj-Napoca",
    template: "%s | Ochelari Cluj",
  },
  description:
    "Optică premium în Cluj-Napoca: rame de designer, lentile de calitate și consultații optice gratuite, în magazin sau la domiciliu. Programează-te azi!",
  keywords: [
    "ochelari cluj",
    "ochelari cluj-napoca",
    "optică cluj-napoca",
    "magazin optică cluj",
    "consultație optică cluj-napoca",
    "consultații optice la domiciliu cluj",
    "control gratuit al vederii cluj",
    "optometrist cluj-napoca",
    "rame ochelari cluj",
    "lentile de contact cluj",
    "ochelari de soare cluj",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "Ochelari Cluj",
    title: "Ochelari Cluj | Optică și Consultații Optice în Cluj-Napoca",
    description:
      "Rame de designer, lentile de calitate și consultații optice gratuite, în magazin sau la domiciliu, în Cluj-Napoca.",
    url: siteUrl,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Optician",
  "@id": `${siteUrl}/#business`,
  name: "Ochelari Cluj",
  description:
    "Magazin de optică în Cluj-Napoca oferind rame, lentile și consultații optice gratuite, în magazin sau la domiciliu.",
  url: siteUrl,
  telephone: "+40264123456",
  email: "contact@ochelaricluj.ro",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Strada Eroilor 42",
    addressLocality: "Cluj-Napoca",
    postalCode: "400129",
    addressRegion: "Cluj",
    addressCountry: "RO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.7712,
    longitude: 23.6236,
  },
  areaServed: {
    "@type": "City",
    name: "Cluj-Napoca",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "15:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
