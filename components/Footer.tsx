import { siteConfig } from '@/lib/config';
import { TrackedLink } from './TrackedLink';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <a className="brand" href="#top"><span className="brand-mark" aria-hidden="true"><span /></span><span className="brand-word">loomie</span></a>
          <p>CRM + automações para organizar o operacional do consultório.</p>
        </div>
        <div className="footer-links">
          <div><strong>Produto</strong><a href="#recursos">Recursos</a><a href="#como-funciona">Como funciona</a><a href="#seguranca">Responsabilidade</a></div>
          <div><strong>Acessos</strong><TrackedLink href={siteConfig.crmUrl} eventName="crm_login_click">Entrar no CRM</TrackedLink><a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">Instagram</a></div>
        </div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 Loomie CRM</span><span>Automação administrativa não substitui atendimento psicológico ou serviços de emergência.</span></div>
    </footer>
  );
}
