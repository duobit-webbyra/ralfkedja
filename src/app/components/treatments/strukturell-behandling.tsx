import React from 'react';
import style from './strukturell-behandling.module.scss';
import Title from '../utils/title';
import TreatmentItem from './treatment-item';

export default function StrukturellBehandling() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <Title
          heading='Strukturell Behandling'
          subHeading='Kotbalansering & Ackermannmetoden'
          description='Syftet med behandlingen är att återställa normal funktion i ryggraden med hjälp av framförallt händerna. Ackermannmetoden omfattar diagnostik, behandling, rehabilitering och förebyggande av smärtor i ryggen. '
          left
        />

        <div
          style={{ width: 'auto', height: '264px', backgroundColor: 'var(--secondary-100)' }}
        ></div>
        <TreatmentItem
          heading='Hur går det till?'
          description='
            Terapeuten arbetar för att återställa normal funktion i leder, muskler och nervsystem.
            Den huvudsakliga behandlingsmetoden är justering som består av olika handgrepp för att
            mobilisera en led eller ett ryggradsområde. Antalet behandlingar som ordineras beror på
            vilka besvär man har och hur länge man har haft dem.
        '
        />
        <TreatmentItem
          heading='Vilka besvär kan behandlas?'
          description='
            Terapeuten behandlar klienter som söker för smärttillstånd i rörelseapparaten. Besvären
            som behandlas kan vara såväl akuta som kroniska. Vanliga exempel på besvär som behandlas
            är: rygg- och nackbesvär, ryggskott, ischias, huvudvärk, migrän, yrsel, andnings- och
            matsmältningsbesvär, premenstruella smärtor, sträckningar, muskel- och ledvärk,
            tennisarmbåge, idrottsskador, förslitningsskador och stress.
        '
        />
      </div>
    </div>
  );
}
