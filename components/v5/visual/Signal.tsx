import styles from '@/app/v5/v5.module.css';

type SignalProps = {
  active?: boolean;
};

export function Signal({ active = false }: SignalProps) {
  return <span className={`${styles.signal} ${active ? styles.signalActive : ''}`} aria-hidden="true" />;
}
