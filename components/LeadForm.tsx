'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { track } from '@/lib/analytics';
import { LEAD_VOLUMES, type LeadErrors, validateLead } from '@/lib/lead-schema';
import { persistUtm, readPersistedUtm, readUtm } from '@/lib/utm';

export function LeadForm() {
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const started = useRef(false);

  useEffect(() => {
    const current = readUtm(new URLSearchParams(window.location.search));
    persistUtm(current);
  }, []);

  function markStarted() {
    if (started.current) return;
    started.current = true;
    track('lead_form_start', readPersistedUtm());
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('idle');

    const form = new FormData(event.currentTarget);
    const parsed = validateLead({
      name: String(form.get('name') ?? ''),
      whatsapp: String(form.get('whatsapp') ?? ''),
      volume: String(form.get('volume') ?? ''),
      priority: String(form.get('priority') ?? ''),
      utm: readPersistedUtm(),
    });

    if (!parsed.success) {
      setErrors(parsed.errors);
      return;
    }

    setErrors({});
    setStatus('sending');
    track('lead_form_submit', parsed.data.utm);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) throw new Error('lead endpoint unavailable');

      setStatus('success');
      track('lead_form_success', parsed.data.utm);
      event.currentTarget.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} onFocus={markStarted} noValidate>
      <div className="field-grid">
        <label>
          <span>Seu nome</span>
          <input name="name" autoComplete="name" placeholder="Como podemos te chamar?" aria-invalid={Boolean(errors.name)} />
          {errors.name ? <small className="field-error">{errors.name}</small> : null}
        </label>
        <label>
          <span>WhatsApp</span>
          <input name="whatsapp" inputMode="tel" autoComplete="tel" placeholder="(11) 99999-9999" aria-invalid={Boolean(errors.whatsapp)} />
          {errors.whatsapp ? <small className="field-error">{errors.whatsapp}</small> : null}
        </label>
      </div>
      <label>
        <span>Volume aproximado de atendimentos</span>
        <select name="volume" defaultValue="" aria-invalid={Boolean(errors.volume)}>
          <option value="" disabled>Selecione uma faixa</option>
          {LEAD_VOLUMES.map((volume) => <option key={volume}>{volume}</option>)}
        </select>
        {errors.volume ? <small className="field-error">{errors.volume}</small> : null}
      </label>
      <label>
        <span>O que mais pesa hoje? <em>opcional</em></span>
        <textarea name="priority" rows={3} placeholder="Ex.: responder novos contatos, confirmar agenda, cobrar..." />
      </label>
      <button
        className="button lead-submit"
        type="submit"
        disabled={status === 'sending'}
        onClick={() => track('cta_click_closing', readPersistedUtm())}
      >
        {status === 'sending' ? 'Enviando…' : 'Quero ver na minha rotina'}
        <span aria-hidden="true">↗</span>
      </button>
      <p className="form-privacy">Não envie informações clínicas de pacientes neste formulário.</p>
      {status === 'success' ? <p className="form-status success" role="status">Recebemos seus dados. Vamos usar esse contexto para a demonstração.</p> : null}
      {status === 'error' ? <p className="form-status error" role="alert">O canal de demonstração ainda não está conectado. Tente novamente depois ou fale com a Loomie pelo Instagram.</p> : null}
    </form>
  );
}
