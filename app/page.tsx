import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { V4Hero } from '@/components/v4/V4Hero';
import { PainThesis } from '@/components/v4/PainThesis';
import { KanbanShowcase } from '@/components/v4/KanbanShowcase';
import { CompactStory } from '@/components/v4/CompactStory';
import { LeoraBoundary } from '@/components/v4/LeoraBoundary';
import { HistoryProof } from '@/components/v4/HistoryProof';
import { AutomationProof } from '@/components/v4/AutomationProof';
import { DashboardProof } from '@/components/v4/DashboardProof';
import { ClinicFit } from '@/components/v4/ClinicFit';
import { Responsibility } from '@/components/v4/Responsibility';
import { V4FAQ } from '@/components/v4/V4FAQ';
import { V4Conversion } from '@/components/v4/V4Conversion';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <V4Hero />
        <PainThesis />
        <KanbanShowcase />
        <CompactStory />
        <LeoraBoundary />
        <HistoryProof />
        <AutomationProof />
        <DashboardProof />
        <ClinicFit />
        <Responsibility />
        <V4FAQ />
        <V4Conversion />
      </main>
      <Footer />
    </>
  );
}
