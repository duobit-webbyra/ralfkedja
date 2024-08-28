import React from 'react';
import style from './default-CTA.module.scss';
import SecondaryButton from '../button/secondary-button';
export default function DefaultCTA() {
  return (
    <div className={style.container}>
      <h3 className={style.text}>Har du frågor eller vill boka tid?</h3>
      <SecondaryButton href='/kontakt'>KONTAKTA MIG</SecondaryButton>
    </div>
  );
}
