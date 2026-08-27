'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { track } from '@/lib/analytics';

const nodes = [
  { label: 'Novo contato', detail: 'entra no fluxo', tone: 'blue' },
  { label: 'Organizar', detail: 'contexto administrativo', tone: 'blue' },
  { label: 'Confirmar', detail: 'agenda e horários', tone: 'green' },
  { label: 'Lembrar', detail: 'pendências e follow-ups', tone: 'green' },
  { label: 'Sinalizar', detail: 'o que pede atenção', tone: 'violet' },
  { label: 'Você decide', detail: 'avaliação e conduta', tone: 'human' },
] as const;

export function LeoraFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const tracked = useRef(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        if (!tracked.current) {
          tracked.current = true;
          track('leora_flow_view');
        }
        observer.disconnect();
      },
      { threshold: 0.24 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`v3-leora ${visible ? 'is-visible' : ''}`}
      aria-labelledby="v3-leora-title"
    >
      <div className="v3-leora__glow" aria-hidden="true" />
      <div className="shell v3-leora__inner">
        <div className="v3-leora__copy">
          <p className="v3-section-kicker v3-section-kicker--light">Leora · assistente operacional</p>
          <h2 id="v3-leora-title">O repetitivo acontece sem disputar sua atenção.</h2>
          <p>
            A Leora executa e organiza etapas administrativas configuradas. Quando algo pede julgamento profissional,
            o fluxo termina em você.
          </p>
          <div className="v3-leora__boundary">
            <span aria-hidden="true">✦</span>
            <p><strong>Limite explícito:</strong> avaliação, decisão e conduta clínica continuam humanas.</p>
          </div>
        </div>

        <ol className="v3-leora-flow" aria-label="Fluxo administrativo da Leora">
          {nodes.map((node, index) => (
            <li
              className={`v3-leora-node v3-leora-node--${node.tone}`}
              style={{ '--v3-node-index': index } as CSSProperties}
              key={node.label}
            >
              <span className="v3-leora-node__number">0{index + 1}</span>
              <div>
                <strong>{node.label}</strong>
                <small>{node.detail}</small>
              </div>
              {index < nodes.length - 1 ? <span className="v3-leora-node__connector" aria-hidden="true">→</span> : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
