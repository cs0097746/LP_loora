import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteConfig.siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 }];
}
