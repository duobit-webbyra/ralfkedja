import LandingPageHero from '@/app/components/hero/landing-page-hero'
import TreatmentGrid from '@/app/components/home/treatment-grid'
import Reviews from '@/app/components/home/reviews'
import Curve from '@/app/components/graphics/curve'
import ContactMe from '@/app/components/home/contact-me'
import AboutMeOverview from '@/app/components/home/about-me'
import Announcement from '@/app/components/announcement/announcement'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ralf Kedja',
  description:
    'Upptäck de olika behandlingar som erbjuds inom kroppsbalansering, kinesiologi och biomagnetism. Läs om metoderna och deras fördelar.',
}

export default function Page() {
  return (
    <>
      <section>
        <LandingPageHero />
      </section>
      <Announcement />
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
        <Curve fillColor="var(--primary-200)" />
        <ContactMe />
      </section>
    </>
  )
}
