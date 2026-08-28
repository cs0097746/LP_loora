import Link from 'next/link';
import styles from '@/app/v5/v5.module.css';

export function V5Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.shell} ${styles.headerInner}`}>
        <Link className={styles.brand} href="/v5" aria-label="Loomie para psicólogos">
          <span className={styles.brandMark} aria-hidden="true">
            <i />
            <i />
          </span>
          <span className={styles.brandWord}>Loomie</span>
          <span className={styles.brandContext}>para psicólogos</span>
        </Link>
        <nav className={styles.headerActions} aria-label="Ações principais">
          <a className={styles.loginLink} href="https://crm.loomiecrm.com/">
            Entrar no CRM
          </a>
          <Link className={styles.headerCta} href="/#demo">
            Conhecer a Loomie
          </Link>
        </nav>
      </div>
    </header>
  );
}
