import React from 'react';
import style from './treatment.module.scss';
import Title from '../utils/title';
import Image from 'next/image';
export default function Kroppsbalansering() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={`${style['title-image']} ${style.reverse}`}>
          <Title
            heading='Kroppsbalansering'
            subHeading='Integrerad kroppsbalansering'
            description='Kroppsbalansering innebär en noggrann bedömning av kroppen för att identifiera och åtgärda grundorsaken till olika hälsoproblem. Behandlingen anpassas efter klientens specifika behov och kan inkludera tekniker som strukturell osteopati och mjuk kiropraktik för att korrigera kotor och leder. Dessutom används biomagnetism för att upptäcka och eliminera patogena mikroorganismer som kan orsaka eller förvärra hälsoproblem. Denna metod syftar till att återställa kroppens balans och funktion för att främja välbefinnande och lindra symtom.'
            left
          />
          <div style={{ position: 'relative', height: '320px', width: '100%', minHeight: '320px' }}>
            <Image
              src='/kroppsbalansering.webp'
              fill
              alt='Kroppsbalansering'
              sizes='(max-width: 720px) 100vw, 50vw'
              style={{ objectFit: 'cover', background: 'var(--secondary-100)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
