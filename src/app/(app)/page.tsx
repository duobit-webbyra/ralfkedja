import LandingPageHero from '@/app/components/hero/landing-page-hero';
import TreatmentGrid from '@/app/components/home/treatment-grid';
import Reviews from '../components/home/reviews';
import Curve from '../components/graphics/curve';
import ContactMe from '../components/home/contact-me';
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
        }}
      >
        <TreatmentGrid />
      </section>

      <section
        style={{
          background: 'var(--secondary-100)',
        }}
      >
        <AboutMeOverview />
      </section>
      <section
        style={{
          backgroundColor: 'var(--primary-200)',
          paddingBlock: '4rem',
        }}
      >
        <Reviews />
      </section>
      <section
        style={{
          backgroundColor: 'var(--primary-300)',
        }}
      >
        <Curve fillColor='var(--primary-200)' />
        <ContactMe />
      </section>
    </>
  );
}
