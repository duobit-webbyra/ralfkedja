import React from 'react';
import style from './self-intro.module.scss';
import Title from '../utils/title';
import Image from 'next/image';
export default function SelfIntro() {
  const description = [
    'Mitt namn är Ralf Kedja och jag jobbar med Kroppsbalansering, kostrådgivning, coaching och träning för dig som vill må bättre! Jag är Diplomerad kinesiolog, utbildad på Svenska Kinesiologiskolan och i Touch For Health Kinesiology som är världens största kinesiologisystem. Jag är även utbildad och diplomerad terapeut i mjuk chiropraktic och strukturell Osteopathy av Ackermann institutet samt diplomerad och licensierad kostrådgivare.',
    'Mitt intresse för hälsa och friskvård grundar sig i att jag är uppvuxen på landet på Gotland där min far verkade som kiropraktor och akupunktör under nästan fem decenium. Betydelsen av helheten när man jobbar med friskvård lärde mig min far mig tidigt, att inte bara behandla symtomer utan hela människan. Mitt synsätt när jag jobbar med kroppsbalansering utgår från fyra principer.',
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
              src='/ralf-cutout.png'
              alt='Ralf Kedja - Kroppsbalansering, Eskilstuna'
              fill
              className={style['image-element']}
              sizes='(max-width: 600px) 90vw, (max-width: 1200px) 50vw, 30vw'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
