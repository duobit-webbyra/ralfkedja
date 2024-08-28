import React from 'react';
import style from './contact-details.module.scss';
import Facebook from '../graphics/facebook';
import Instagram from '../graphics/instagram';
import Link from 'next/link';
export default function ContactDetails() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.title}>
          <h1>Kom i kontakt med mig!</h1>
          <p>
            Jag finns här för att hjälpa dig på din resa mot bättre hälsa och balans. Tveka inte att
            nå ut för att boka en tid eller ställa frågor.
          </p>
        </div>
        <div className={style.detailsgrid}>
          <div className={style.detail}>
            <h3>Adress</h3>
            <div>
              <p>Bruksgatan 8B</p>
              <p>633 20, Eskilstuna</p>
            </div>
          </div>
          <div className={style.detail}>
            <h3>E-mail</h3>
            <p>ralked@hotmail.com</p>
          </div>
          <div className={style.detail}>
            <h3>Telefon</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p>0709-12 21 28</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link href={`${data?.socials?.facebook}`}>
                  <Facebook />
                </Link>
                <Link href={`${data?.socials?.instagram}`}>
                  <Instagram />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
