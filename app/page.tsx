import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { CinematicHero } from '@/components/v3/CinematicHero';
import { DashboardProof } from '@/components/v3/DashboardProof';
import { FinalConversion } from '@/components/v3/FinalConversion';
import { HowItFits } from '@/components/v3/HowItFits';
import { LeoraFlow } from '@/components/v3/LeoraFlow';
import { Manifesto } from '@/components/v3/Manifesto';
import { ProductProof } from '@/components/v3/ProductProof';
import { Responsibility } from '@/components/v3/Responsibility';
import { ScrollStory } from '@/components/v3/ScrollStory';
import { V3FAQ } from '@/components/v3/V3FAQ';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <CinematicHero />
        <Manifesto />
        <ScrollStory />
        <LeoraFlow />
        <ProductProof />
        <DashboardProof />
        <HowItFits />
        <Responsibility />
        <V3FAQ />
        <FinalConversion />
      </main>
      <Footer />
    </>
  );
}
