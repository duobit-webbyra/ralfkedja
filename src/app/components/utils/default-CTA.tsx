import React from 'react';
import style from './default-CTA.module.scss';
import SecondaryButton from '../button/secondary-button';
export default function DefaultCTA() {
  return (
    <div className={style.container}>
      <h3 className={style.text}>Har du frågor du vill ställa mig?</h3>
      <div className={style.button}>
        <SecondaryButton href='/kontakt'>
          <p>KONTAKTA MIG</p>
        </SecondaryButton>
      </div>
    </div>
  );
}
