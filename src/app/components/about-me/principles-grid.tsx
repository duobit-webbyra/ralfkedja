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
            description='Rörelse är grundläggande för en frisk och fungerande kropp. Genom regelbunden fysisk aktivitet kan vi förbättra vår rörlighet, styrka och cirkulation. Jag betonar vikten av att integrera varierade rörelseformer i din vardag för att främja både fysisk och mental hälsa. Effektiv rörelse är en nyckel till att förebygga och hantera smärta samt stödja kroppens naturliga läkningsprocesser.'
            icon={<Movement />}
          />
          <PrincipleCard
            title='Näring'
            description='Korrekt näring är avgörande för att stödja kroppens funktioner och främja allmänt välbefinnande. En balanserad kost, rik på essentiella näringsämnen som vitaminer, mineraler och antioxidanter, hjälper till att upprätthålla energi och styrka samt stödja kroppens naturliga processer. Genom att förstå näringens påverkan kan vi optimera din hälsa, förbättra din livskvalitet och stärka kroppens förmåga att hantera stress och återhämta sig.'
            icon={<Nutrition />}
          />
          <PrincipleCard
            title='Återhämtning'
            description='Återhämtning är en central del av ett hälsosamt liv och viktig för att kroppen ska kunna återställa sin balans och energi. Effektiv återhämtning innebär att ge kroppen tillräcklig tid för vila och återhämtning genom sömn, avslappning och återställande aktiviteter. Det handlar om att hitta en balans mellan aktivitet och vila för att främja kroppens naturliga läkningsprocesser, förbättra energinivåerna och stödja långsiktig hälsa och välbefinnande.'
            icon={<Recovery />}
          />
          <PrincipleCard
            title='Relationer'
            description='Starka och positiva relationer är avgörande för vår emotionella och psykiska hälsa. Kvalitativa sociala nätverk och stödjande relationer kan bidra till ett mer balanserat liv. Genom att vårda sina relationer och bygga ett stödjande socialt nätverk ökar välbefinnandet, och vi blir bättre rustade att hantera stress och livets utmaningar.'
            icon={<Relations />}
          />
        </div>
      </div>
    </div>
  );
}
