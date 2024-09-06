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
            description='En genomgång av kroppen görs för att söka efter grundorsaken till klientens problem, sen behandlas det med olika "verktyg" utifrån klientens behov. Denna behandling omfattar:strukturell osteopati och mjuk kiropraktik, korrigering av alla kotor och leder i kroppen.Biomagnetism, söker och eliminerar patogena mikroorganismer som kan, eller har, ställt till problem i kroppen.'
            left
          />
          <div style={{ position: 'relative', height: '320px', width: '100%', minHeight: '320px' }}>
            <Image src='/nature.webp' fill alt='Picture of the author' objectFit='cover' />
          </div>
        </div>
      </div>
    </div>
  );
}
