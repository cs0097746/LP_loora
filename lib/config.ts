export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://loomiecrm.com',
  crmUrl: 'https://crm.loomiecrm.com/',
  demoUrl: process.env.NEXT_PUBLIC_DEMO_URL ?? '#demo',
  instagramUrl: 'https://www.instagram.com/loomiecrm/',
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? '',
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '',
} as const;
