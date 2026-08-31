import styles from './v5.module.css';
import { V5Header } from '@/components/v5/V5Header';
import { V5Hero } from '@/components/v5/V5Hero';
import { InterSessionPressure } from '@/components/v5/InterSessionPressure';
import { InboundFlow } from '@/components/v5/InboundFlow';

export default function V5Page() {
  return (
    <div className={styles.page}>
      <V5Header />
      <main>
        <V5Hero />
        <InterSessionPressure />
        <InboundFlow />
      </main>
    </div>
  );
}
