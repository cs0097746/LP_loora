'use client';

import { useEffect, useState } from 'react';

const beats = [
  {
    id: 'new-contact',
    time: '14:32',
    title: 'Chegou um novo contato.',
    body: 'A conversa administrativa não fica solta: o contato entra no fluxo e passa a ter uma etapa visível.',
    src: '/product-v4/kanban-left.webp',
    label: 'novo contato',
  },
  {
    id: 'availability',
    time: '14:35',
    title: 'O próximo passo ficou claro.',
    body: 'A disponibilidade e o estágio da jornada ficam organizados para você saber exatamente onde retomar.',
    src: '/product-v4/kanban-left.webp',
    label: 'aguardando horário',
  },
  {
    id: 'follow-up',
    time: '14:40',
    title: 'O follow-up já tem lugar.',
    body: 'Tarefas e rotinas administrativas deixam de depender da sua memória entre uma sessão e outra.',
    src: '/product-v4/kanban-right.webp',
    label: 'follow-up organizado',
  },
] as const;

export function CompactStory() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-v4-story-step]'));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number((visible.target as HTMLElement).dataset.v4StoryStep ?? 0);
      setActive(index);
    }, { rootMargin: '-28% 0px -42% 0px', threshold: [0.15, 0.45, 0.7] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="v4-story" aria-labelledby="v4-story-title">
      <div className="shell">
        <div className="v4-section-head">
          <p className="v4-kicker">Uma sequência curta, não quatro telas vazias</p>
          <h2 id="v4-story-title">Enquanto você atende, o contexto continua no lugar.</h2>
        </div>

        <div className="v4-story__grid">
          <div className="v4-story__steps">
            {beats.map((beat, index) => (
              <article
                className="v4-story__step"
                data-v4-story-step={index}
                aria-current={active === index ? 'step' : undefined}
                key={beat.id}
              >
                <time>{beat.time}</time>
                <h3>{beat.title}</h3>
                <p>{beat.body}</p>
                <div className="v4-story__mobile-media">
                  <img src={beat.src} width="1800" height="1120" alt={`Interface demonstrativa do Loomie no momento ${beat.time}`} />
                  <span>{beat.label}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="v4-story__sticky" aria-label="Interface demonstrativa acompanhando a jornada administrativa">
            <div className="v4-product-window v4-story__window" data-active-step={active}>
              <div className="v4-product-window__bar" aria-hidden="true"><span /><span /><span /><small>jornada administrativa · ambiente demo</small></div>
              <div className="v4-product-window__viewport">
                <img
                  src={beats[active].src}
                  width="1800"
                  height="1120"
                  alt="Kanban real do ambiente demonstrativo do Loomie"
                />
                <div className={`v4-story__focus v4-story__focus--${active}`} aria-hidden="true">
                  <span>{beats[active].label}</span>
                </div>
              </div>
            </div>
            <p className="v4-story__caption">O destaque muda; a base continua sendo a interface real do ambiente demo.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
