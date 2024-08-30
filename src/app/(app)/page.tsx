import LandingPageHero from '@/app/components/hero/landing-page-hero';
import TreatmentGrid from '@/app/components/home/treatment-grid';
import Reviews from '../components/home/reviews';
import Curve from '../components/graphics/curve';
import ContactMe from '../components/home/contact-me';
import AboutMeOverview from '../components/home/about-me';
import Announcement from '../components/announcement/announcement';
import ContactForm from '../components/contact/contact-form';
import Map from '../components/utils/map';

export default function Page() {
  return (
    <>
      <section>
        <LandingPageHero />
      </section>
      <Announcement />
      {/* <section */}
      {/*   style={{ */}
      {/*     backgroundColor: 'var(--primary-300)', */}
      {/*     padding: '1rem 0', */}
      {/*     width: '100%', */}
      {/*     display: 'flex', */}
      {/*     justifyContent: 'center', */}
      {/*     color: 'var(--secondary-100)', */}
      {/*     fontSize: '1.5rem', */}
      {/*     textAlign: 'center', */}
      {/*   }} */}
      {/* > */}
      {/*   29/08 är jag borta på semester och kommer tillbaka 06/09 */}
      {/* </section> */}
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
