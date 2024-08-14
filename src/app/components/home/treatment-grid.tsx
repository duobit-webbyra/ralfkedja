import style from './treatment-grid.module.scss';

import TreatmentCard from './treatment-card';

export default function TreatmentGrid() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.text}>
          <h1>Behandlingstyper</h1>
          <h2>Utforska olika behandlingstyper</h2>
          <p>Främjar balans, hälsa och välmående genom en holistisk ansats</p>
        </div>
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
