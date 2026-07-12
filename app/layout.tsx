import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DRC Advogados | Advocacia Empresarial em São Paulo",
  description:
    "Escritório de advocacia empresarial fundado em 2004 em São Paulo. Direito Empresarial, Tributário, Contratos, Contencioso, LGPD e mais. Atendimento nacional.",
  keywords:
    "advocacia empresarial são paulo, advogado empresarial sp, direito empresarial, planejamento tributário, LGPD, recuperação judicial, contratos comerciais",
  authors: [{ name: "DRC Advogados" }],
  openGraph: {
    title: "DRC Advogados | Advocacia Empresarial Premium em São Paulo",
    description:
      "Quando a decisão importa de verdade, você já sabe com quem ligar. 20 anos de experiência, 500+ casos, atendimento nacional.",
    type: "website",
    locale: "pt_BR",
    siteName: "DRC Advogados",
  },
  twitter: {
    card: "summary_large_image",
    title: "DRC Advogados | Advocacia Empresarial em São Paulo",
    description:
      "Escritório de advocacia empresarial de alto padrão. Desde 2004.",
  },
  robots: "index, follow",
  alternates: { canonical: "https://drcadvogados.com.br" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F8F4EC",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-white text-ink antialiased">{children}</body>
    </html>
  );
}
