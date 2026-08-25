import { siteConfig } from '@/lib/config';

describe('siteConfig', () => {
  it('keeps the CRM login stable', () => {
    expect(siteConfig.crmUrl).toBe('https://crm.loomiecrm.com/');
  });

  it('has a safe in-page demo fallback', () => {
    expect(siteConfig.demoUrl).toBeTruthy();
  });
});
