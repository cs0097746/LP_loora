import { ClosingCTA } from '@/components/ClosingCTA';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { HowItWorks } from '@/components/HowItWorks';
import { PainSequence } from '@/components/PainSequence';
import { ProductShowcase } from '@/components/ProductShowcase';
import { Security } from '@/components/Security';
import { TrustStrip } from '@/components/TrustStrip';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <PainSequence />
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
