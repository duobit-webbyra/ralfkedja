import style from './review.module.scss';

export default function Reviews() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.text}>
          <h1>Kundrecensioner</h1>
          <h2>Utforska olika behandlingstyper</h2>
          <p>Främjar balans, hälsa och välmående genom en holistisk ansats</p>
        </div>
      </div>
    </div>
  );
}
