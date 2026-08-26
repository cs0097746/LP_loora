'use client';

import { faqItems } from '@/content/landing';
import { track } from '@/lib/analytics';

export function FAQ() {
  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="shell faq-grid">
        <div className="faq-intro">
          <p className="section-label">Dúvidas antes da demo</p>
          <h2 id="faq-title">O que costuma aparecer antes de colocar a rotina para rodar.</h2>
          <p>Sem letras miúdas e sem transformar automação administrativa em promessa clínica.</p>
        </div>
        <div className="faq-list">
          {faqItems.map((item) => (
            <details
              key={item.question}
              onToggle={(event) => {
                if (event.currentTarget.open) {
                  track('faq_open', { question: item.question });
                }
              }}
            >
              <summary>{item.question}<span aria-hidden="true">+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
