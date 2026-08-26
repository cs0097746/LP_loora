import { afterEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/lead/route';

describe('POST /api/lead', () => {
  const originalWebhook = process.env.LEAD_WEBHOOK_URL;

  afterEach(() => {
    vi.restoreAllMocks();
    if (originalWebhook === undefined) delete process.env.LEAD_WEBHOOK_URL;
    else process.env.LEAD_WEBHOOK_URL = originalWebhook;
  });

  it('returns 502 when the configured webhook throws', async () => {
    process.env.LEAD_WEBHOOK_URL = 'https://hooks.example.test/lead';
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network down'));

    const request = new Request('http://localhost/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Marina Costa',
        whatsapp: '(11) 99999-9999',
        volume: '11 a 20 por semana',
      }),
    });

    const response = await POST(request);

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ error: 'Falha ao encaminhar lead.' });
  });
});
