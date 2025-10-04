import ContactDetails from '@/app/components/contact/contact-details';
import ContactPage from '@/app/components/contact/contact-page';
import DefaultHero from '@/app/components/hero/default-hero';
import getContactData from '@/app/utils/get-contact-data';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ralf Kedja | Kontakt',
  description:
    'Kontakta mig för att boka tid eller få mer information. Här hittar du kontaktuppgifter inklusive adress, telefonnummer och e-postadress.',
};

export default async function Page() {
  return (
    <>
      <DefaultHero title='Kontakt' />
      <section>
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
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2033.2085446041845!2d16.511617477273603!3d59.36285830833638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465ef2ba833abc05%3A0x4c54dd0f62152d6d!2sK%C3%B6pmangatan%204B%2C%20633%2056%20Eskilstuna!5e0!3m2!1ssv!2sse!4v1729937955124!5m2!1ssv!2sse'
        width='100%'
        height='500'
        loading='lazy'
        style={{ border: 0 }}
      />
    </>
  );
}
