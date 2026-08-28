import type { V5State } from '@/content/v5';
import styles from '@/app/v5/v5.module.css';

const labels: Record<V5State, string> = {
  novo: 'novo',
  'proximo-passo': 'próximo passo',
  aguardando: 'aguardando',
  confirmado: 'confirmado',
};

type StatusLabelProps = {
  state: V5State;
};

export function StatusLabel({ state }: StatusLabelProps) {
  return (
    <span className={styles.statusLabel} data-state={state}>
      {labels[state]}
    </span>
  );
}
