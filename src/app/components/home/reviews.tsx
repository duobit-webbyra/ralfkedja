import style from './reviews.module.scss';
import ReviewCard from './review-card';
import Title from '../utils/title';
export default function Reviews() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <Title
          heading='Kundrecensioner'
          subHeading='Vad mina kunder säger om sina upplevelser'
          description='Läs hur mina behandlingar har hjälpt andra att återfå balansen och uppnå bättre hälsa.'
          inverse
        />
        <div className={style['review-cards']}>
          <ReviewCard
            reviewMessage='Inlyssnande, lugn, metodisk. Erbjöd kostnadsfritt återbesök om det inte kändes bra efter ett par dagar. Det är kundfokus och service!'
            reviewAuthor='Helena W.'
          />
          <ReviewCard
            reviewMessage='Mycket kunnig, och trevlig. Väldigt
förtroendeingivande.'
            reviewAuthor='Marie S.'
          />
          <ReviewCard
            reviewMessage='Wow! Vilket bemötande, vilken behandling! Återkommer gärna!'
            reviewAuthor='Anna W.'
          />
        </div>
      </div>
    </div>
  );
}
