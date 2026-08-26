'use client';

import { faqItems } from '@/content/landing';
import { track } from '@/lib/analytics';

export function FAQ() {
  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-title">
      <div className="shell faq-grid">
        <div className="faq-intro">
          <p className="section-label">Perguntas antes de decidir</p>
          <h2 id="faq-title">O que vale esclarecer antes de levar a Loomie para a sua rotina.</h2>
          <p>WhatsApp, automações, implantação e os limites entre operação e prática clínica.</p>
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
