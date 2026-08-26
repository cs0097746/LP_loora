import { track } from '@/lib/analytics';

describe('track', () => {
  it('pushes named events to dataLayer when available', () => {
    window.dataLayer = [];
    track('cta_click_hero', { utm_source: 'instagram' });
    expect(window.dataLayer).toEqual([{ event: 'cta_click_hero', utm_source: 'instagram' }]);
  });

  it('does not fail when analytics providers are absent', () => {
    delete window.dataLayer;
    delete window.fbq;
    expect(() => track('faq_open')).not.toThrow();
  });
});
