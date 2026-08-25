import { siteConfig } from '@/lib/config';
import { TrackedLink } from './TrackedLink';

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href="#top" aria-label="Loomie para Psicólogos — início">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span className="brand-word">loomie</span>
          <span className="brand-vertical">para psicólogos</span>
        </a>

        <nav className="header-nav" aria-label="Navegação principal">
          <a href="#recursos">Recursos</a>
          <a href="#como-funciona">Como funciona</a>
          <a href="#seguranca">Segurança</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="header-actions">
          <TrackedLink className="text-link header-login" href={siteConfig.crmUrl} eventName="crm_login_click">
            Entrar
          </TrackedLink>
          <TrackedLink className="button button-small" href="#demo" eventName="cta_click_header">
            Ver a Loomie funcionando
          </TrackedLink>
        </div>
      </div>
    </header>
  );
}
