import type { Metadata } from "next";

// Self-hosted fonts: the font files ship inside these npm packages, so
// there's no runtime or *build-time* fetch to fonts.googleapis.com. The
// previous next/font/google setup failed the Vercel build whenever that
// fetch was unreachable — this removes that failure mode entirely, and
// also lets the CSP drop its Google Fonts allowances (see next.config.js).
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

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
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
