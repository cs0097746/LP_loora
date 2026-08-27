import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "./v4.css";
import "./v4-product.css";
import "./v4-conversion.css";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://loomiecrm.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CRM para Psicólogos | Loomie",
  description:
    "A Loomie organiza contatos e rotinas administrativas do consultório em um CRM com automações configuráveis e assistência operacional da Leora.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "CRM para Psicólogos | Loomie",
    description: "Sua clínica organizada enquanto você cuida de quem está na sua frente.",
    url: "/",
    siteName: "Loomie",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CRM para Psicólogos | Loomie",
    description: "Contatos, agenda, confirmações e follow-ups em um fluxo administrativo organizado.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
