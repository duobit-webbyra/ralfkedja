import React from 'react';
import style from './contact-form.module.scss';
import EmailForm from '../utils/email-form';

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
        <EmailForm />
      </div>
    </div>
  );
}
