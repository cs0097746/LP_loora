import Image from 'next/image';
import { siteConfig } from '@/lib/config';
import { TrackedLink } from './TrackedLink';

export function Hero() {
  return (
    <section className="hero section" id="top">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">CRM + automações para psicólogos</p>
          <h1>Sua clínica continua andando <span>enquanto você está em sessão.</span></h1>
          <p className="hero-lede">
            A Loomie centraliza novos contatos, agenda, confirmações e follow-ups. A Leora ajuda a organizar as rotinas repetitivas e sinaliza o que precisa da sua atenção.
          </p>

          <div className="hero-actions">
            <TrackedLink className="button button-large" href="#demo" eventName="cta_click_hero">
              Ver a Loomie na minha rotina
              <span aria-hidden="true">↗</span>
            </TrackedLink>
            <TrackedLink className="secondary-link" href={siteConfig.crmUrl} eventName="crm_login_click">
              Acessar o CRM
            </TrackedLink>
          </div>

          <p className="hero-microcopy">Novos contatos · agenda · confirmações · follow-ups</p>
        </div>

        <div className="hero-product" aria-describedby="hero-demo-note">
          <div className="product-frame hero-product-frame">
            <Image
              data-testid="hero-crm-image"
              className="product-image"
              src="/product/loomie-kanban.webp"
              alt="Kanban do Loomie organizando a jornada administrativa de contatos em um consultório demo"
              width={1000}
              height={439}
              priority
              sizes="(max-width: 760px) 920px, (max-width: 1180px) 58vw, 700px"
            />
          </div>
          <div className="hero-proof-line" aria-hidden="true">
            <span>14 contatos organizados no fluxo demo</span>
            <span>Do primeiro contato ao follow-up</span>
          </div>
          <p className="sr-only" id="hero-demo-note">A imagem mostra um ambiente demonstrativo do Loomie com registros totalmente fictícios.</p>
        </div>
      </div>
    </section>
  );
}
