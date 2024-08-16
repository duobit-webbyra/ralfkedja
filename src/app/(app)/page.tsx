import LandingPageHero from '@/app/components/hero/landing-page-hero';
import TreatmentGrid from '@/app/components/home/treatment-grid';
import Reviews from '../components/home/review';
import AboutMeOverview from '../components/home/about-me';

export default function Page() {
  return (
    <>
      <section>
        <LandingPageHero />
      </section>
      <section
        style={{
          paddingBlock: '4rem',
          borderBottom: '1px solid var(--primary-400)',
        }}
      >
        <TreatmentGrid />
      </section>
      <section
        style={{
          borderBottom: '1px solid var(--primary-400)',
          background: 'var(--secondary-100)',
        }}
      >
        <AboutMeOverview />
      </section>
      <section
        style={{
          backgroundColor: 'var(--primary-300)',
          paddingBlock: '4rem',
        }}
      >
        <Reviews />
      </section>
    </>
  );
}
