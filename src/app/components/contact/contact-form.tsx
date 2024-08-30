import React from 'react';
import style from './contact-form.module.scss';

interface ContactFormProps {
  layout: 'grid' | 'flex';
}

export default function ContactForm({ layout }: ContactFormProps) {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <form className={style.form}>
          <div className={`${style.inputs} ${layout === 'grid' ? style.grid : style.flex}`}>
            <input className={style.forminput} type='text' placeholder='Namn' />
            <input className={style.forminput} type='tel' placeholder='Telefon' />
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
  );
}
