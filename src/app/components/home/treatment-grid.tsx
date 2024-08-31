import style from './treatment-grid.module.scss';

import TreatmentCard from './treatment-card';
import Balance from '../graphics/home/balance';
import Health from '../graphics/home/health';
import Muscles from '../graphics/home/muscles';
import Magnet from '../graphics/home/magnet';
import Title from '../utils/title';
import BigLeaf from '../graphics/home/bigleaf';
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
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              transform: 'translateX(60px)',
              rotate: '180deg',
            }}
            className={style.leaf}
          >
            <BigLeaf />
          </div>

          <TreatmentCard
            title='Strukturell behandling'
            description='Syftet med behandlingen är att återställa normal funktion i ryggraden med hjälp av framförallt händerna.'
            href='/'
            icon={<Health />}
          />
          <TreatmentCard
            title='Kroppsbalansering'
            description='En genomgång av kroppen görs för att söka efter grundorsaken till klientens problem, sen behandlas det med olika "verktyg" utifrån klientens behov.'
            href='/'
            icon={<Balance />}
          />
          <TreatmentCard
            title='Kinesiologi'
            description='Kinesiologi är en metod att kommunicera med en annan persons nervsystem genom att testa spänningen i musklerna.'
            href='/'
            icon={<Muscles />}
          />
          <TreatmentCard
            title='Biomagnetism'
            description='Biomagnetism ingår också i begreppet magnetbehandlingar, och är en metod baserad på de effekter som starka magneter utövar på kroppen.'
            href='/'
            icon={<Magnet />}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              transform: 'translateX(60px)',
            }}
            className={style.leaf}
          >
            <BigLeaf />
          </div>
        </div>
      </div>
    </div>
  );
}
