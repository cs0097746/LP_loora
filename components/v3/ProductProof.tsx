'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';

function useOnceVisible(eventName: string) {
  const ref = useRef<HTMLElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || fired.current) return;
        fired.current = true;
        track(eventName);
        observer.disconnect();
      },
      { threshold: 0.28 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [eventName]);

  return ref;
}

export function ProductProof() {
  const contextRef = useOnceVisible('product_context_view');
  const automationRef = useOnceVisible('product_automation_view');

  return (
    <section className="v3-proof" id="produto" aria-labelledby="v3-proof-title">
      <div className="shell">
        <header className="v3-proof__header">
          <p className="v3-section-kicker">Produto real · ambiente demonstrativo</p>
          <h2 id="v3-proof-title">Contexto que continua existindo quando você fecha o WhatsApp.</h2>
          <p>
            O CRM mantém a parte administrativa da jornada visível: onde o contato está, o que já aconteceu e qual é o próximo passo.
          </p>
        </header>

        <article ref={contextRef} className="v3-proof-scene v3-proof-scene--history">
          <div className="v3-proof-scene__copy">
            <span className="v3-proof-index">01 / CONTEXTO</span>
            <h3>Você não precisa lembrar onde aquela conversa parou.</h3>
            <p>
              Histórico, etapa e observações administrativas ficam reunidos em uma superfície que pode ser retomada sem reconstruir a conversa de cabeça.
            </p>
            <div className="v3-proof-note"><span aria-hidden="true">↳</span> Dados e nomes exibidos são fictícios.</div>
          </div>

          <div className="v3-history-art">
            <figure className="v3-media-frame v3-history-art__main">
              <figcaption>Histórico administrativo · demo</figcaption>
              <Image
                src="/product/loomie-contact-history.webp"
                alt="Histórico administrativo demonstrativo de um contato fictício no Loomie"
                width={1000}
                height={520}
                unoptimized
              />
            </figure>
            <div className="v3-history-art__crop" aria-hidden="true">
              <Image src="/product/loomie-contact-history.webp" alt="" width={1000} height={520} unoptimized />
            </div>
            <div className="v3-history-art__label" aria-hidden="true">
              <span>contexto preservado</span>
              <strong>retome daqui</strong>
            </div>
          </div>
        </article>

        <article ref={automationRef} className="v3-proof-scene v3-proof-scene--automation">
          <div className="v3-proof-scene__copy">
            <span className="v3-proof-index">02 / CONTINUIDADE</span>
            <h3>O próximo passo não precisa depender da sua memória.</h3>
            <p>
              Gatilhos e tarefas administrativas podem sustentar confirmações, lembretes e follow-ups do jeito que o seu fluxo for configurado.
            </p>
          </div>

          <div className="v3-automation-art" aria-label="Relação entre gatilhos e tarefas administrativas no Loomie">
            <figure className="v3-media-frame v3-automation-art__trigger">
              <figcaption>quando acontece</figcaption>
              <Image
                src="/product/loomie-automations.webp"
                alt="Gatilhos administrativos demonstrativos configurados no Loomie"
                width={900}
                height={254}
                unoptimized
              />
            </figure>
            <div className="v3-automation-art__line" aria-hidden="true"><span>o Loomie organiza</span></div>
            <figure className="v3-media-frame v3-automation-art__task">
              <figcaption>o que exige atenção chega até você</figcaption>
              <Image
                src="/product/loomie-tasks.webp"
                alt="Tarefa administrativa demonstrativa agendada no Loomie"
                width={900}
                height={339}
                unoptimized
              />
            </figure>
            <span className="v3-demo-disclosure">Ambiente demo · automações configuráveis</span>
          </div>
        </article>
      </div>
    </section>
  );
}
