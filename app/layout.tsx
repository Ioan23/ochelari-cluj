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

export const metadata: Metadata = {
  title: {
    default: "Ochelari Cluj | Optică de Calitate în Inima Clujului",
    template: "%s | Ochelari Cluj",
  },
  description:
    "Magazin de optică premium în Cluj-Napoca. Rame de designer, lentile de calitate și consultanță profesională. Vizitați-ne azi!",
  keywords: [
    "ochelari cluj",
    "optică cluj-napoca",
    "rame ochelari",
    "lentile de contact",
    "ochelari de soare",
    "optometrist cluj",
  ],
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: "Ochelari Cluj",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
