import React from 'react';
import style from './contact-me.module.scss';
import Title from '../utils/title';

import ContactForm from '../contact/contact-form';
import Container from '../essentials/Container';

export default function ContactMe() {
  return (
    <Container className='py-16 flex flex-col gap-16'>
      <div>
        <div className={style.titleleft}>
          <Title
            heading='Kontakta mig'
            subHeading='Har du frågor eller vill boka tid?'
            description='Skicka ett meddelande så återkommer jag så snart jag kan.'
            inverse
            left
          />
        </div>
        <div className={style.titlecenter}>
          <Title
            heading='Kontakta mig'
            subHeading='Har du några frågor?'
            description='Skicka ett meddelande så återkommer jag så snart jag kan.'
            inverse
          />
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-8 w-full h-full'>
        <div className='w-full lg:w-1/3 flex flex-col'>
          <ContactForm />
        </div>
        <div className='w-full lg:w-2/3 flex'>
          <iframe
            className='w-full h-full rounded-lg border-0'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2033.2085446041845!2d16.511617477273603!3d59.36285830833638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465ef2ba833abc05%3A0x4c54dd0f62152d6d!2sK%C3%B6pmangatan%204B%2C%20633%2056%20Eskilstuna!5e0!3m2!1ssv!2sse!4v1729937955124!5m2!1ssv!2sse'
            loading='lazy'
          />
        </div>
      </div>
    </Container>
  );
}
