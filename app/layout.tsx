import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const siteUrl = "https://www.drcadvogados.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DRC Advogados | Advocacia Corporativa em São Paulo",
    template: "%s | DRC Advogados",
  },
  description:
    "DRC Advogados é um escritório de advocacia corporativa em São Paulo, com atuação sóbria e técnica em direito empresarial.",
  keywords: [
    "advocacia corporativa",
    "escritório de advocacia São Paulo",
    "direito empresarial",
    "DRC Advogados",
  ],
  openGraph: {
    title: "DRC Advogados | Advocacia Corporativa em São Paulo",
    description:
      "Advocacia corporativa sóbria e técnica, com atuação orientada por rigor e discrição.",
    url: siteUrl,
    siteName: "DRC Advogados",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1600,
        height: 900,
        alt: "DRC Advogados — emblema em dourado sobre base de mármore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DRC Advogados | Advocacia Corporativa em São Paulo",
    description: "Advocacia corporativa sóbria e técnica em São Paulo.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${montserrat.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
