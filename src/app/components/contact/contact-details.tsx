import React from 'react';
import style from './contact-details.module.scss';
import Facebook from '../graphics/facebook';
import Instagram from '../graphics/instagram';
import Link from 'next/link';
import { Contact } from '@/payload-types';
import Image from 'next/image';
import assetPrefix from '@/app/utils/asset-prefix';

interface ContactDetailsProps {
  data?: Contact;
}

export default function ContactDetails({ data }: ContactDetailsProps) {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.left}>
          <div className={style.title}>
            <h1>Kom i kontakt med mig!</h1>
            <p>
              Jag finns här för att hjälpa dig på din resa mot bättre hälsa i balans. Tveka inte att
              nå ut för att boka en tid eller ställa frågor.
            </p>
          </div>
          <div className={style.detailsgrid}>
            <div className={style.detail}>
              <h3>Adress</h3>
              <div>
                <p>{data?.address.street}</p>
                <p>
                  {data?.address.zipcode}, {data?.address.city}
                </p>
              </div>
            </div>
            <div className={style.detail}>
              <h3>E-mail</h3>
              <p>{data?.email}</p>
            </div>
            <div className={style.detail}>
              <h3>Telefon</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <p>{data?.phone}</p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link href={`${data?.links?.facebook}`}>
                    <Facebook />
                  </Link>
                  <Link href={`${data?.links?.instagram}`}>
                    <Instagram />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.right}>
          <Image
            src={assetPrefix('ralf-kontakt.webp')}
            alt='Ralf Kedja - Kroppsbalansering, Eskilstuna'
            fill
            className={style['image-element']}
            sizes='60vw'
          />
        </div>
      </div>
    </div>
  );
}
