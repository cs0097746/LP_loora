import { persistUtm, readPersistedUtm, readUtm } from '@/lib/utm';

describe('UTM helpers', () => {
  beforeEach(() => window.sessionStorage.clear());

  it('extracts only supported campaign parameters', () => {
    const params = new URLSearchParams('utm_source=instagram&utm_medium=paid&utm_campaign=psico&utm_content=hero&x=ignore');
    expect(readUtm(params)).toEqual({
      utm_source: 'instagram',
      utm_medium: 'paid',
      utm_campaign: 'psico',
      utm_content: 'hero',
    });
  });

  it('persists campaign context for later conversion', () => {
    persistUtm({ utm_source: 'instagram', utm_campaign: 'psico' });
    expect(readPersistedUtm()).toEqual({ utm_source: 'instagram', utm_campaign: 'psico' });
  });
});
