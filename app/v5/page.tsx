import styles from './v5.module.css';
import { V5Header } from '@/components/v5/V5Header';
import { V5Hero } from '@/components/v5/V5Hero';
import { InterSessionPressure } from '@/components/v5/InterSessionPressure';
import { InboundFlow } from '@/components/v5/InboundFlow';
import { WeekFlow } from '@/components/v5/WeekFlow';
import { RealProductProof } from '@/components/v5/RealProductProof';
import { LeoraBoundaryV5 } from '@/components/v5/LeoraBoundaryV5';
import { EndOfDay } from '@/components/v5/EndOfDay';
import { V5Conversion } from '@/components/v5/V5Conversion';
import { V5Footer } from '@/components/v5/V5Footer';

export default function V5Page() {
  return (
    <div className={styles.page}>
      <V5Header />
      <main>
        <V5Hero />
        <InterSessionPressure />
        <InboundFlow />
        <WeekFlow />
        <RealProductProof />
        <LeoraBoundaryV5 />
        <EndOfDay />
        <V5Conversion />
      </main>
      <V5Footer />
    </div>
  );
}
