import React from 'react';
import style from './self-intro.module.scss';
import Title from '../utils/title';
export default function SelfIntro() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.text}>
          <Title
            heading='Vem är jag?'
            subHeading='Ralf Kedja'
            description='Mitt namn är Ralf Kedja och jag jobbar med Kroppsbalansering, kostrådgivning, coaching
            och träning för dig som vill må bättre! Jag är Diplomerad kinesiolog, utbildad på
            Svenska Kinesiologiskolan och i Touch For Health Kinesiology som är världens största
            kinesiologisystem. Jag är även utbildad och diplomerad terapeut i mjuk chiropraktic och
            strukturell Osteopathy av Ackermann institutet samt diplomerad och licensierad
            kostrådgivare. Mitt intresse för hälsa och friskvård grundar sig i att jag är uppvuxen
            på landet på Gotland där min far verkade som kiropraktor och akupunktör under nästan fem
            decenium. Betydelsen av helheten när man jobbar med friskvård lärde mig min far mig
            tidigt, att inte bara behandla symtomer utan hela människan. Mitt synsätt när jag jobbar
            med kroppsbalansering utgår från fyra principer.'
            left
          />
        </div>

        <div className={style.image}></div>
      </div>
    </div>
  );
}
