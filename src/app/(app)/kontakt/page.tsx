import ContactDetails from '@/app/components/contact/contact-details';
import ContactForm from '@/app/components/contact/contact-form';
import Curve from '@/app/components/graphics/curve';
import Image from 'next/image';
export default function Page() {
  return (
    <>
      <section
        style={{
          paddingTop: '2rem',
        }}
      >
        <ContactDetails />
      </section>
      <Image
        style={{ position: 'absolute', right: '15%', top: '400px' }}
        src='/flowers.png'
        width={500}
        height={500}
        alt='exempelbild'
      />
      <section
        style={{
          backgroundColor: 'var(--primary-300)',
        }}
      >
        <div style={{ width: '100%' }}>
          <Curve fillColor='var(--tertiary-100)' />
        </div>

        <ContactForm />
      </section>
    </>
  );
}
