import style from './review.module.scss';

import Title from '../utils/title';

export default function Reviews() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <Title
          heading='Kundrecensioner'
          subHeading='Utforska olika behandlingstyper'
          description='Främjar balans, hälsa och välmående genom en holistisk ansats'
          inverse
        ></Title>
      </div>
    </div>
  );
}
