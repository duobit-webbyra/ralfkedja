import style from './reviews.module.scss';
import ReviewCard from './review-card';

export default function Reviews() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.text}>
          <h1>Kundrecensioner</h1>
          <h2>Vad mina kunder säger om sina upplevelser</h2>
          <p>
            Läs hur mina behandlingar har hjälpt andra att återfå balansen och uppnå bättre hälsa.
          </p>
        </div>
        <div className={style.reviewcards}>
          <ReviewCard
            reviewmessage='Inlyssnande, lugn, metodisk. Erbjöd kostnadsfritt återbesök om det inte kändes bra efter ett par dagar. Det är kundfokus och service!'
            reviewauthor='Helena W.'
          />
          <ReviewCard
            reviewmessage='Mycket kunnig, och trevlig. Väldigt
förtroendeingivande.'
            reviewauthor='Marie S.'
          />
          <ReviewCard
            reviewmessage='Wow! Vilket bemötande, vilken behandling! Återkommer gärna!'
            reviewauthor='Anna W.'
          />
        </div>
      </div>
    </div>
  );
}
