import type { UTMData } from './utm';

export const LEAD_VOLUMES = [
  'Até 10 por semana',
  '11 a 20 por semana',
  '21 a 40 por semana',
  'Mais de 40 por semana',
] as const;

export type LeadInput = {
  name: string;
  whatsapp: string;
  volume: string;
  priority?: string;
  utm?: UTMData;
};

export type LeadErrors = Partial<Record<'name' | 'whatsapp' | 'volume', string>>;

export function validateLead(input: LeadInput) {
  const errors: LeadErrors = {};
  const name = input.name.trim();
  const whatsapp = input.whatsapp.replace(/\D/g, '');
  const volume = input.volume.trim();

  if (name.length < 2) errors.name = 'Informe seu nome.';
  if (whatsapp.length < 10 || whatsapp.length > 13) {
    errors.whatsapp = 'Informe um WhatsApp com DDD.';
  }
  if (!LEAD_VOLUMES.some((option) => option === volume)) {
    errors.volume = 'Selecione uma faixa de atendimentos.';
  }

  if (Object.keys(errors).length > 0) {
    return { success: false as const, errors };
  }

  return {
    success: true as const,
    data: {
      name,
      whatsapp,
      volume,
      priority: input.priority?.trim() ?? '',
      utm: input.utm ?? {},
    },
  };
}
