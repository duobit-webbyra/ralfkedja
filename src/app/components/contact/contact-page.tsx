import Title from '@/app/components/utils/title';
import ContactForm from '@/app/components/contact/contact-form';
import Curve from '@/app/components/graphics/curve';

import style from './contact-page.module.scss';

export default function ContactPage() {
  return (
    <>
      <div style={{ width: '100%' }}>
        <Curve fillColor='var(--tertiary-100)' />
      </div>
      <div className={style.container}>
        <Title
          heading='Hör av dig'
          subHeading='Fyll i formuläret'
          description='Jag ser fram emot att höra från dig!'
          inverse
        />
        <div className={style['contact-form']}>
          <ContactForm grid />
        </div>
      </div>
    </>
  );
}
