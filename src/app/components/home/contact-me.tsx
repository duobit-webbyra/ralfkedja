import React from 'react';
import style from './contact-me.module.scss';
import Title from '../utils/title';

import ContactForm from '../contact/contact-form';

export default function ContactMe() {
  return (
    <div className={style.container}>
      <div className={style.content}>
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

        <div className={style.contactsection}>
          <div className={style.form}>
            <ContactForm layout='flex' />
          </div>
          <iframe
            className={style.mapcontainer}
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2033.2085446041845!2d16.511617477273603!3d59.36285830833638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465ef2ba833abc05%3A0x4c54dd0f62152d6d!2sK%C3%B6pmangatan%204B%2C%20633%2056%20Eskilstuna!5e0!3m2!1ssv!2sse!4v1729937955124!5m2!1ssv!2sse'
            width='100%'
            height='500'
            loading='lazy'
            style={{ border: 0 }}
          />
        </div>
      </div>
    </div>
  );
}
