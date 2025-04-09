import React from 'react';
import style from './default-CTA.module.scss';
import SecondaryButton from '../button/secondary-button';
interface DefaultCTAProps {
  title?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function DefaultCTA({ title, buttonText, buttonHref }: DefaultCTAProps) {
  return (
    <div className={style.container}>
      <h3 className={style.text}>{title || 'Har du frågor du vill ställa mig?'}</h3>
      <div className={style.button}>
        <SecondaryButton href={buttonHref || '/kontakt'}>
          <p>{buttonText || 'KONTAKTA MIG'}</p>
        </SecondaryButton>
      </div>
    </div>
  );
}
