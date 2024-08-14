import React from 'react';
import PrincipleCard from './principle-card';
import style from './principles-grid.module.scss';
import Movement from '../graphics/about-us/movement';
import Nutrition from '../graphics/about-us/nutrition';
import Recovery from '../graphics/about-us/recovery';
import Relations from '../graphics/about-us/relations';

export default function PrinciplesGrid() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.text}>
          <h1>Mina principer</h1>
        </div>
        <div className={style.cards}>
          <PrincipleCard
            title='Rörelse'
            description='Terapeuten arbetar för att återställa normal funktion i leder, muskler och nervsystem. Den huvudsakliga behandlingsmetoden är justering som består av olika handgrepp för att mobilisera en led eller ett ryggradsområde. Antalet behandlingar som ordineras beror på vilka besvär man har och hur länge man har haft dem.'
            icon={<Movement />}
          />
          <PrincipleCard
            title='Näring'
            description='Terapeuten arbetar för att återställa normal funktion i leder, muskler och nervsystem. Den huvudsakliga behandlingsmetoden är justering som består av olika handgrepp för att mobilisera en led eller ett ryggradsområde. Antalet behandlingar som ordineras beror på vilka besvär man har och hur länge man har haft dem.'
            icon={<Nutrition />}
          />
          <PrincipleCard
            title='Återhämtning'
            description='Terapeuten arbetar för att återställa normal funktion i leder, muskler och nervsystem. Den huvudsakliga behandlingsmetoden är justering som består av olika handgrepp för att mobilisera en led eller ett ryggradsområde. Antalet behandlingar som ordineras beror på vilka besvär man har och hur länge man har haft dem.'
            icon={<Recovery />}
          />
          <PrincipleCard
            title='Relationer'
            description='Terapeuten arbetar för att återställa normal funktion i leder, muskler och nervsystem. Den huvudsakliga behandlingsmetoden är justering som består av olika handgrepp för att mobilisera en led eller ett ryggradsområde. Antalet behandlingar som ordineras beror på vilka besvär man har och hur länge man har haft dem.'
            icon={<Relations />}
          />
        </div>
      </div>
    </div>
  );
}
