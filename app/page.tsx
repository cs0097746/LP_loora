import { ClosingCTA } from '@/components/ClosingCTA';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HowItWorks } from '@/components/HowItWorks';
import { Security } from '@/components/Security';
import { CinematicHero } from '@/components/v3/CinematicHero';
import { DashboardProof } from '@/components/v3/DashboardProof';
import { LeoraFlow } from '@/components/v3/LeoraFlow';
import { Manifesto } from '@/components/v3/Manifesto';
import { ProductProof } from '@/components/v3/ProductProof';
import { ScrollStory } from '@/components/v3/ScrollStory';

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
        <HowItWorks />
        <Security />
        <FAQ />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
