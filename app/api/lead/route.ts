import { NextResponse } from 'next/server';
import { validateLead } from '@/lib/lead-schema';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const parsed = validateLead({
    name: String(input.name ?? ''),
    whatsapp: String(input.whatsapp ?? ''),
    volume: String(input.volume ?? ''),
    priority: String(input.priority ?? ''),
    utm: typeof input.utm === 'object' && input.utm ? input.utm as Record<string, string> : {},
  });

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.errors }, { status: 422 });
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: 'Canal de leads não configurado.' }, { status: 503 });
  }

  let response: Response;
  try {
    response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...parsed.data, source: 'loomie-psicologos-lp', createdAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    return NextResponse.json({ error: 'Falha ao encaminhar lead.' }, { status: 502 });
  }

  if (!response.ok) {
    return NextResponse.json({ error: 'Falha ao encaminhar lead.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
