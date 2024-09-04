import React from 'react';
import style from './treatment.module.scss';
import Title from '../utils/title';

export default function Kroppsbalansering() {
  return (
    <div className={style.container}>
      <div className={style.content} style={{ 'row-gap': '0' }}>
        <div
          style={{ width: 'auto', height: '264px', backgroundColor: 'var(--secondary-100)' }}
        ></div>
        <Title
          heading='Kroppsbalansering'
          subHeading='Integrerad kroppsbalansering'
          description='En genomgång av kroppen görs för att söka efter grundorsaken till klientens problem, sen behandlas det med olika "verktyg" utifrån klientens behov. Denna behandling omfattar:strukturell osteopati och mjuk kiropraktik, korrigering av alla kotor och leder i kroppen.Biomagnetism, söker och eliminerar patogena mikroorganismer som kan, eller har, ställt till problem i kroppen.'
          left
        />
      </div>
    </div>
  );
}
