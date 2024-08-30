import ContactDetails from '@/app/components/contact/contact-details';
import ContactPage from '@/app/components/contact/contact-page';
import DefaultHero from '@/app/components/hero/default-hero';
import Map from '@/app/components/utils/map';
import getContactData from '@/app/utils/get-contact-data';

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
          paddingBottom: '4rem',
        }}
      >
        <ContactPage />
      </section>
      <div style={{ width: '100%', height: '500px' }}>
        <Map />
      </div>
    </>
  );
}
