import type { V5State } from '@/content/v5';
import { StatusLabel } from '@/components/v5/visual/StatusLabel';
import styles from '@/app/v5/v5.module.css';

type AppointmentSlotProps = {
  time: string;
  state: V5State;
};

export function AppointmentSlot({ time, state }: AppointmentSlotProps) {
  return (
    <article className={styles.appointmentSlot}>
      <div className={styles.objectTopline}>
        <span>HORÁRIO</span>
        <StatusLabel state={state} />
      </div>
      <strong>{time}</strong>
      <small>agenda</small>
    </article>
  );
}
