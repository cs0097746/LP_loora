import baseStyles from '@/app/v5/v5.module.css';
import styles from '@/app/v5/v5-conversion.module.css';

export function V5Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${baseStyles.shell} ${styles.footerInner}`}>
        <div>
          <a className={styles.footerBrand} href="/" aria-label="Loomie para psicólogos">Loomie</a>
          <p className={styles.footerMeta}>CRM PARA ORGANIZAR RELAÇÕES E ROTINAS · PSICOLOGIA</p>
        </div>
        <nav className={styles.footerLinks} aria-label="Links do rodapé">
          <a href="#produto">Produto</a>
          <a href="#demo">Conhecer a Loomie</a>
          <a href="https://crm.loomiecrm.com/">Entrar no CRM</a>
        </nav>
      </div>
    </footer>
  );
}
