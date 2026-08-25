'use client';

import type { UTMData } from './utm';

type AnalyticsProperties = Record<string, string | number | boolean | undefined> & UTMData;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(eventName: string, properties: AnalyticsProperties = {}) {
  if (typeof window === 'undefined') return;

  window.dataLayer?.push({ event: eventName, ...properties });

  if (typeof window.fbq === 'function') {
    window.fbq('trackCustom', eventName, properties);
  }
}
