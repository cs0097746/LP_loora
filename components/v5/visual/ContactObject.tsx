import type { V5State } from '@/content/v5';
import { StatusLabel } from '@/components/v5/visual/StatusLabel';
import styles from '@/app/v5/v5.module.css';

type ContactObjectProps = {
  name: string;
  state: V5State;
};

export function ContactObject({ name, state }: ContactObjectProps) {
  return (
    <article className={styles.contactObject}>
      <div className={styles.objectTopline}>
        <span>NOVO CONTATO</span>
        <StatusLabel state={state} />
      </div>
      <strong>{name}</strong>
      <small>via mensagem</small>
    </article>
  );
}
