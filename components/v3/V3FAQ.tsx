'use client';

import { track } from '@/lib/analytics';

const items = [
  {
    question: 'A Leora toma decisões clínicas por mim?',
    answer: 'Não. A Leora atua no operacional administrativo. Avaliação, decisão e conduta clínica continuam sob responsabilidade do psicólogo.',
  },
  {
    question: 'Preciso mudar toda a minha rotina para usar a Loomie?',
    answer: 'A proposta é partir do seu fluxo atual e configurar etapas, responsáveis e automações em torno dele. A demonstração serve para mapear onde a Loomie se encaixa antes de qualquer mudança.',
  },
  {
    question: 'O que dá para automatizar no administrativo?',
    answer: 'Exemplos incluem organização de novos contatos, confirmações, lembretes, movimentações de etapas, tarefas e follow-ups administrativos, conforme o fluxo configurado.',
  },
  {
    question: 'Como funciona a demonstração e o onboarding?',
    answer: 'Primeiro entendemos sua rotina e mostramos um fluxo aderente ao cenário. A partir daí, implantação e configuração são alinhadas ao que realmente será usado no consultório.',
  },
] as const;

export function V3FAQ() {
  return (
    <section className="v3-faq" id="faq" aria-labelledby="v3-faq-title">
      <div className="shell v3-faq__grid">
        <div className="v3-faq__intro">
          <p className="v3-section-kicker">Antes de decidir</p>
          <h2 id="v3-faq-title">Quatro perguntas que valem resposta antes da demonstração.</h2>
          <p>Sem promessas mágicas: fluxo, limites e implantação precisam estar claros.</p>
        </div>

        <div className="v3-faq__list">
          {items.map((item, index) => (
            <details
              key={item.question}
              onToggle={(event) => {
                if (event.currentTarget.open) track('faq_open', { question: item.question });
              }}
            >
              <summary><span>0{index + 1}</span>{item.question}<i aria-hidden="true">+</i></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
