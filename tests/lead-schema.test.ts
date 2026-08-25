import { validateLead } from '@/lib/lead-schema';

describe('validateLead', () => {
  it('rejects incomplete contact data', () => {
    const result = validateLead({ name: 'A', whatsapp: '123', volume: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.name).toBeTruthy();
      expect(result.errors.whatsapp).toBeTruthy();
      expect(result.errors.volume).toBeTruthy();
    }
  });

  it('normalizes a valid WhatsApp number', () => {
    const result = validateLead({ name: 'Marina Costa', whatsapp: '(11) 99999-9999', volume: '11 a 20 por semana' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.whatsapp).toBe('11999999999');
  });
});
