import React from 'react';
import style from './contact-me.module.scss';
import PrimaryButton from '../button/primary-button';
import Title from '../utils/title';
import Map from '../utils/map';
import SecondaryButton from '../button/secondary-button';
export default function ContactMe() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div style={{ padding: '0 1rem' }}>
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
              subHeading='Har du frågor eller vill boka tid?'
              description='Skicka ett meddelande så återkommer jag så snart jag kan.'
              inverse
            />
          </div>
        </div>

        <div className={style.contactsection}>
          <form className={style.form}>
            <div className={style.formgrid}>
              <input className={style.forminput} type='text' placeholder='Namn' />
              <input className={style.forminput} type='email' placeholder='E-mail' />
              <input className={style.forminput} type='text' placeholder='Ämne' />
            </div>
            <textarea placeholder='Meddelande'></textarea>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <SecondaryButton>Boka tid</SecondaryButton>
              <PrimaryButton>Skicka</PrimaryButton>
            </div>
          </form>
          <div className={style.mapcontainer}>
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
}
