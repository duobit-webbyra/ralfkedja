import React from 'react';
import style from './contact-form.module.scss';
import PrimaryButton from '../button/primary-button';

export default function ContactForm() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.title}>
          <h2>Hör av dig</h2>
          <div
            style={{ backgroundColor: 'var(--tertiary-100)', width: '4rem', height: '4px' }}
          ></div>
          <div>
            <p>Fyll i formuläret nedan så återkommer jag till dig så snart som möjligt.</p>
            <p> Jag ser fram emot att höra från dig!</p>
          </div>
        </div>
        <form className={style.form}>
          <div className={style.formgrid}>
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
