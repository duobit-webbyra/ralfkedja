import React from 'react';
import PrimaryButton from '../button/primary-button';
import style from './email-form.module.scss';
export default function EmailForm() {
  return (
    <form className={style.form}>
      <div className={style.formgrid}>
        <input className={style.forminput} type='text' placeholder='Namn' />
        <input className={style.forminput} type='tel' placeholder='Telefon' />
        <input className={style.forminput} type='email' placeholder='E-mail' />
        <input className={style.forminput} type='text' placeholder='Ämne' />
      </div>
      <textarea style={{ resize: 'none' }} placeholder='Meddelande'></textarea>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <PrimaryButton>Skicka</PrimaryButton>
      </div>
    </form>
  );
}
