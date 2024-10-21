import style from './reviews.module.scss';
import ReviewCard from './review-card';
import Title from '@/app/components/utils/title';
import PrimaryButton from '../button/primary-button';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { Review } from '@/payload-types';
import Link from 'next/link';
const parseReviewAuthor = (name: string | undefined) => {
  if (!name) return '';

  const firstName = name.split(' ')[0];
  const lastName = name.split(' ')[1];

  return firstName + ' ' + lastName[0] + '.';
};

export default async function Reviews() {
  const payload = await getPayloadHMR({ config });
  const data = await payload.findGlobal({
    slug: 'highlight-reviews',
  });

  const reviewOne = data.reviews?.['review-one'] as Review | undefined;
  const reviewTwo = data.reviews?.['review-two'] as Review | undefined;
  const reviewThree = data.reviews?.['review-three'] as Review | undefined;

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
            reviewMessage={`${reviewOne?.feedback}`}
            reviewAuthor={parseReviewAuthor(reviewOne?.name)}
          />
          <ReviewCard
            reviewMessage={`${reviewTwo?.feedback}`}
            reviewAuthor={parseReviewAuthor(reviewTwo?.name)}
          />
          <ReviewCard
            reviewMessage={`${reviewThree?.feedback}`}
            reviewAuthor={parseReviewAuthor(reviewThree?.name)}
          />
        </div>
        <Link
          href='https://www.bokadirekt.se/places/eskilstuna-kroppsbalansering-25963'
          style={{ margin: 'auto', display: 'flex', justifyContent: 'center' }}
        >
          <PrimaryButton>Läs fler rescensioner här</PrimaryButton>
        </Link>
      </div>
    </div>
  );
}
