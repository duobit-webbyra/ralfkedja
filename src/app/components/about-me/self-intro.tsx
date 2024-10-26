import React from 'react';
import style from './self-intro.module.scss';
import Title from '../utils/title';
import Image from 'next/image';
import assetPrefix from '@/app/utils/asset-prefix';
export default function SelfIntro() {
  const description = [
    'Jag heter Ralf Kedja och specialiserar mig på kroppsbalansering, kostrådgivning, coaching och träning för dig som vill förbättra ditt välbefinnande. Jag är diplomerad kinesiolog, utbildad vid Svenska Kinesiologiskolan och i Touch For Health Kinesiology, det största kinesiologisystemet globalt. Dessutom är jag utbildad och diplomerad terapeut i mjuk kiropraktik och strukturell osteopati vid Ackermann Institutet samt diplomerad och licensierad kostrådgivare.',
    'Mitt intresse för hälsa och friskvård har sina rötter på Gotland, där jag växte upp på landet. Min far arbetade som kiropraktor och akupunktör i nästan fem decennier, och hans helhetssyn på friskvård har präglat min egen filosofi. Jag har tidigt lärt mig vikten av att inte bara behandla symptom utan att se till hela människan. När jag arbetar med kroppsbalansering utgår jag från fyra grundläggande principer som säkerställer en helhetssyn på din hälsa och välbefinnande.',
  ];
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.text}>
          <Title heading='Vem är jag?' subHeading='Ralf Kedja' description={description} left />
        </div>

        <div className={style['image-container']}>
          <div className={style['image-inner']}>
            <Image
              src={assetPrefix('/ralf-hem.webp')}
              alt='Ralf Kedja - Kroppsbalansering, Eskilstuna'
              fill
              className={style['image-element']}
              sizes='(max-width: 600px) 60vw, (max-width: 1200px) 30vw, 80vw'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
