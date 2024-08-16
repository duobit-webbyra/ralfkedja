import React from 'react';
import style from './contact-me.module.scss';
import PrimaryButton from '../button/primary-button';
import Title from '../utils/title';

export default function ContactMe() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <Title
          heading='Kontakta mig'
          subHeading='Har du frågor eller vill boka tid?'
          description='Skicka ett meddelande så återkommer jag så snart jag kan.'
          inverse
          left
        />
        <div className={style.contactsection}>
          <div
            style={{
              backgroundColor: 'var(--primary-100)',
              width: '100%',
              borderRadius: '32px',
              height: '500px',
            }}
          ></div>
          <form className={style.form}>
            <div className={style.formgrid}>
              <input className={style.forminput} type='text' placeholder='Namn' />
              <input className={style.forminput} type='email' placeholder='E-mail' />
              <input className={style.forminput} type='text' placeholder='Ämne' />
            </div>
            <textarea placeholder='Meddelande'></textarea>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <PrimaryButton>Skicka</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
