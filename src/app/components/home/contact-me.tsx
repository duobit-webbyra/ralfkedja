import React from 'react';
import style from './contact-me.module.scss';
import Title from '../utils/title';
import Map from '../utils/map';
import EmailForm from '../utils/email-form';
export default function ContactMe() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.title}>
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
          <EmailForm />
          <div className={style.mapcontainer}>
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
}
