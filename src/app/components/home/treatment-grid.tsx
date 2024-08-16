import style from './treatment-grid.module.scss';

import TreatmentCard from './treatment-card';
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
        <div className={style.cards}>
          <TreatmentCard
            title='Strukturell behandling'
            description='Syftet med behandling'
            href='/'
            icon={<></>}
          />
          <TreatmentCard
            title='Strukturell behandling'
            description='Syftet med behandling'
            href='/'
            icon={<></>}
          />
          <TreatmentCard
            title='Strukturell behandling'
            description='Syftet med behandling'
            icon={<></>}
            href='/'
          />
          <TreatmentCard
            title='Strukturell behandling'
            description='Syftet med behandling'
            href='/'
            icon={<></>}
          />
        </div>
      </div>
    </div>
  );
}
