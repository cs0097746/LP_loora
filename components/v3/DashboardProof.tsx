'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';

const callouts = ['14 contatos no ambiente demo', '6 etapas do fluxo', 'pipeline visível'] as const;

export function DashboardProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const tracked = useRef(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || tracked.current) return;
        tracked.current = true;
        track('product_dashboard_view');
        observer.disconnect();
      },
      { threshold: 0.24 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="v3-dashboard" aria-labelledby="v3-dashboard-title">
      <div className="shell v3-dashboard__intro">
        <p className="v3-section-kicker">Visão do operacional</p>
        <h2 id="v3-dashboard-title">Veja o que está acontecendo sem reconstruir sua rotina de cabeça.</h2>
        <p>Uma visão ampla do pipeline ajuda a perceber volume, etapa e pendências do ambiente administrativo.</p>
      </div>

      <div className="v3-dashboard__bleed">
        <div className="v3-dashboard__frame">
          <div className="v3-dashboard__chrome" aria-hidden="true">
            <span /><span /><span /><small>Dashboard · ambiente demonstrativo</small>
          </div>
          <Image
            src="/product/loomie-dashboard.webp"
            alt="Dashboard demonstrativo do Loomie com pipeline e contatos fictícios"
            width={1440}
            height={760}
            unoptimized
          />
          <div className="v3-dashboard__callouts" aria-label="Detalhes visíveis no ambiente demonstrativo">
            {callouts.map((callout, index) => (
              <span key={callout} className={`v3-dashboard-callout v3-dashboard-callout--${index + 1}`}>
                <i aria-hidden="true" />{callout}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
