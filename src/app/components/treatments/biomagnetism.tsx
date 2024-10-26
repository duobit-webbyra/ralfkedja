import React from 'react';
import style from './treatment.module.scss';
import Title from '../utils/title';
import Image from 'next/image';
import TreatmentItem from './treatment-item';
import assetPrefix from '@/app/utils/asset-prefix';

export default function Biomagnetism() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={`${style['title-image']} ${style.reverse}`}>
          <Title
            heading='Biomagnetism'
            subHeading='Biomagnetiska behandlingar'
            description='Biomagnetism är en behandlingsmetod som använder magneter för att återställa kroppens naturliga balans och främja självläkning. Genom att applicera specifika magneter på olika punkter på kroppen kan biomagnetiska behandlingar hjälpa till att eliminera patogena mikroorganismer och förbättra kroppens funktion och hälsa. '
            left
          />
          <div style={{ position: 'relative', height: '320px', width: '100%', minHeight: '320px' }}>
            <Image
              src={assetPrefix('/biomagnetism.webp')}
              fill
              alt='Picture of the author'
              sizes='(max-width: 720px) 100vw, 50vw'
              style={{ objectFit: 'cover', background: 'var(--tertiary-100)' }}
            />
          </div>
        </div>
        <div className={style['treatment-items']}>
          <TreatmentItem
            heading='Hur går det till?'
            description='Under en biomagnetisk behandling placeras magneter på specifika områden av kroppen där obalanser eller störningar upptäckts. Dessa magneter skapar ett magnetfält som påverkar kroppens celler och mikroorganismer, vilket kan bidra till att eliminera patogener och främja kroppens naturliga återhämtningsprocesser. Behandlingen är icke-invasiv och kan kombineras med andra terapier för att stödja övergripande hälsa.'
          />
          <TreatmentItem
            heading='Vilka besvär kan behandlas?'
            description='Biomagnetiska behandlingar kan vara effektiva för att hantera en rad olika hälsoproblem, inklusive smärta, inflammation, matsmältningsbesvär, kronisk trötthet, migrän, stress och infektioner. Genom att rikta in sig på patogena mikroorganismer och kroppens energiflöden, syftar biomagnetism till att förbättra hälsotillstånd och stödja kroppens självläkande mekanismer.'
          />
        </div>
      </div>
    </div>
  );
}
