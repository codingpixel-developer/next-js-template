import { Navbar } from '@/app/_shared/components/sections/navbar/navbar';
import { HeroSection } from '@/app/_shared/components/sections/heroSection/heroSection';
import { FeatureRow } from '@/app/_shared/components/sections/featureRow/featureRow';

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeatureRow />
    </main>
  );
}
