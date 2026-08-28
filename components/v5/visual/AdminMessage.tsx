import type { ReactNode } from 'react';
import styles from '@/app/v5/v5.module.css';

type AdminMessageProps = {
  time: string;
  children: ReactNode;
};

export function AdminMessage({ time, children }: AdminMessageProps) {
  return (
    <article className={styles.adminMessage}>
      <div className={styles.objectTopline}>
        <span>EXEMPLO ILUSTRATIVO</span>
        <time>{time}</time>
      </div>
      <p>{children}</p>
    </article>
  );
}
