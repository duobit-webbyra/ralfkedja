import ContactDetails from '@/app/components/contact/contact-details';
import ContactForm from '@/app/components/contact/contact-form';
import Curve from '@/app/components/graphics/curve';
import DefaultHero from '@/app/components/hero/default-hero';
import Map from '@/app/components/utils/map';
import getContactData from '@/app/utils/get-contact-data';
import Title from '@/app/components/utils/title';

export default async function Page() {
  return (
    <>
      <DefaultHero title='Kontakt' />
      <section
        style={{
          paddingTop: '2rem',
        }}
      >
        <ContactDetails data={await getContactData()} />
      </section>
      <section
        style={{
          backgroundColor: 'var(--primary-300)',
        }}
      >
        <div style={{ width: '100%' }}>
          <Curve fillColor='var(--tertiary-100)' />
        </div>
        <Title
          heading='Hör av dig'
          subHeading='Fyll i formuläret'
          description='Jag ser fram emot att höra från dig!'
          inverse
        />
        <div
          style={{
            width: 'var(--content-width)',
          }}
        >
          <ContactForm layout='grid' />
        </div>
      </section>
      <div style={{ width: '100%', height: '500px' }}>
        <Map />
      </div>
    </>
  );
}
