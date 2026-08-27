import { track } from '@/lib/analytics';

describe('track', () => {
  it('pushes named events to dataLayer when available', () => {
    window.dataLayer = [];
    track('cta_click_hero', { utm_source: 'instagram' });
    expect(window.dataLayer).toEqual([{ event: 'cta_click_hero', utm_source: 'instagram' }]);
  });

  it('transports all V3 view events without a second analytics layer', () => {
    window.dataLayer = [];
    const events = [
      'hero_sequence_view',
      'story_step_view',
      'leora_flow_view',
      'product_context_view',
      'product_automation_view',
      'product_dashboard_view',
    ];

    events.forEach((event) => track(event));

    expect(window.dataLayer).toEqual(events.map((event) => ({ event })));
  });

  it('does not fail when analytics providers are absent', () => {
    delete window.dataLayer;
    delete window.fbq;
    expect(() => track('faq_open')).not.toThrow();
  });
});
