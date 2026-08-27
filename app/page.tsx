import { ClosingCTA } from '@/components/ClosingCTA';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HowItWorks } from '@/components/HowItWorks';
import { ProductShowcase } from '@/components/ProductShowcase';
import { Security } from '@/components/Security';
import { CinematicHero } from '@/components/v3/CinematicHero';
import { Manifesto } from '@/components/v3/Manifesto';
import { ScrollStory } from '@/components/v3/ScrollStory';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <CinematicHero />
        <Manifesto />
        <ScrollStory />
        <ProductShowcase />
        <HowItWorks />
        <Security />
        <FAQ />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
