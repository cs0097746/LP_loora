import Image from 'next/image';
import type { ReactNode } from 'react';

export function ProductCanvas({ children }: { children?: ReactNode }) {
  return (
    <div className="v3-product-canvas">
      <div className="v3-product-canvas__chrome" aria-hidden="true">
        <span />
        <span />
        <span />
        <strong>Clínica Horizonte — jornada administrativa</strong>
      </div>
      <div className="v3-product-canvas__viewport">
        <Image
          data-testid="hero-crm-image"
          className="v3-product-canvas__image"
          src="/product/loomie-kanban.webp"
          alt="Kanban demonstrativo do Loomie organizando contatos fictícios em uma jornada administrativa"
          width={1000}
          height={439}
          priority
          unoptimized
          sizes="(max-width: 900px) 900px, 850px"
        />
        <div className="v3-kanban-focus" aria-hidden="true">
          <span className="v3-kanban-focus__label">Novo contato</span>
          <strong>Primeiro contato pelo WhatsApp</strong>
          <small>Ana Ribeiro · DEMO</small>
        </div>
        <div className="v3-kanban-destination" aria-hidden="true">Agendado</div>
      </div>
      {children}
    </div>
  );
}
