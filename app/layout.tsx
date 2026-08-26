import type { Metadata } from 'next';
import { Bricolage_Grotesque, IBM_Plex_Mono, Source_Sans_3 } from 'next/font/google';
import type { ReactNode } from 'react';
import { AnalyticsScripts } from '@/components/AnalyticsScripts';
import { siteConfig } from '@/lib/config';
import './globals.css';
import './mobile-overrides.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const body = Source_Sans_3({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-mono', display: 'swap' });

const title = 'Loomie para Psicólogos | CRM para o operacional do consultório';
const description = 'Centralize novos contatos, confirmações, follow-ups e rotinas administrativas em um CRM para psicólogos, com automações configuráveis e controle humano.';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    title: 'Sua clínica continua andando enquanto você está em sessão.',
    description,
    url: '/',
    siteName: 'Loomie para Psicólogos',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Loomie para Psicólogos',
    description: 'CRM + automações para organizar o operacional do consultório.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}<AnalyticsScripts /></body>
    </html>
  );
}
