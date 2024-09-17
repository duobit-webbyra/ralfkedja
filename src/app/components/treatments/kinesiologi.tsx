import React from 'react';
import style from './treatment.module.scss';
import Title from '../utils/title';
import TreatmentItem from './treatment-item';
import Image from 'next/image';
import assetPrefix from '@/app/utils/asset-prefix';
export default function Kinesiologi() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style['title-image']}>
          <Title
            heading='KINESIOLOGI'
            subHeading='Kinesiologiska behandlingar'
            description='Kinesiologi är en behandlingsmetod som fokuserar på att förbättra kroppens funktion genom att använda muskeltester för att identifiera och åtgärda obalanser i nervsystemet och muskuloskeletala systemet. Målet är att återställa kroppens naturliga balans och stödja kroppens självläkande processer. '
            left
          />

          <div style={{ position: 'relative', height: '320px', width: '100%', minHeight: '320px' }}>
            <Image
              src={assetPrefix('kinesiologi-behandling.webp')}
              fill
              alt='Kinesiologi'
              sizes='(max-width: 720px) 100vw, 50vw'
              style={{ objectFit: 'cover', background: 'var(--secondary-100)' }}
            />
          </div>
        </div>
        <div className={style['title-image']}>
          <TreatmentItem
            heading='Hur går det till?'
            description='
            Vid en kinesiologisk behandling utför terapeuten muskeltester för att bedöma kroppens reaktioner och identifiera obalanser eller blockeringar i nervsystemet. Terapeuten använder sedan en kombination av manuella tekniker, akupressur, stretching och andra behandlingar för att korrigera dessa obalanser. Behandlingen är skräddarsydd för att möta varje individs specifika behov och kan inkludera rådgivning om livsstil och kost för att stödja den övergripande hälsan.'
          />
          <TreatmentItem
            heading='Vilka besvär kan behandlas?'
            description='
            Kinesiologiska behandlingar kan hjälpa till att lindra en mängd olika besvär, inklusive rygg- och nacksmärtor, huvudvärk, migrän, muskel- och ledvärk, stress, ångest, matsmältningsproblem, allergier och idrottsskador. Genom att fokusera på att balansera kroppens muskler och nervsystem kan kinesiologi bidra till att förbättra allmänt välbefinnande och funktion.'
          />
        </div>
      </div>
    </div>
  );
}
