import style from './treatment-grid.module.scss';

import TreatmentCard from './treatment-card';
import Balance from '../graphics/home/balance';
import Health from '../graphics/home/health';
import Muscles from '../graphics/home/muscles';
import Magnet from '../graphics/home/magnet';
import Title from '../utils/title';

export default function TreatmentGrid() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <Title
          heading='Behandlingstyper'
          subHeading='Utforska olika behandlingstyper'
          description='Främjar balans, hälsa och välmående genom en holistisk ansats'
        />
        <div style={{ position: 'relative' }} className={style.cards}>
          <TreatmentCard
            title='Strukturell behandling'
            description='Behandlingen syftar till att återställa normal funktion i ryggraden och lederna med hjälp av framförallt händerna.'
            href='/behandlingar#strukturell-behandling'
            icon={<Health />}
          />
          <TreatmentCard
            title='Kroppsbalansering'
            description='En helhetsgenomgång av kroppen görs för att hitta grundorsaken till problemet och behandlas sedan med olika metoder anpassade efter klientens behov.'
            href='/behandlingar#kroppsbalansering'
            icon={<Balance />}
          />
          <TreatmentCard
            title='Kinesiologi'
            description='En metod för att kommunicera med nervsystemet genom att testa muskelspänningar för att identifiera och behandla obalanser i kroppen.'
            href='/behandlingar#kinesiologi'
            icon={<Muscles />}
          />
          <TreatmentCard
            title='Biomagnetism'
            description='Biomagnetism ingår i begreppet magnetbehandlingar, och är en metod baserad på de effekter som starka magneter utövar på kroppen.'
            href='/behandlingar#biomagnetism'
            icon={<Magnet />}
          />
        </div>
      </div>
    </div>
  );
}
