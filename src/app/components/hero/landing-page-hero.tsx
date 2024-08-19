import PrimaryButton from '@/app/components/button/primary-button';
import SecondaryButton from '@/app/components/button/secondary-button';
import { MdLocalPhone } from 'react-icons/md';
import Image from 'next/image';
import style from './landing-page-hero.module.scss';
import ReviewStar from '../graphics/review-star';

export default function LandingPageHero() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.left}>
          <div className={style.text}>
            <h1>Balans för Kropp och Själ</h1>
            <p>Friskvårdande behandlingar för ett hälsosammare liv.</p>
          </div>
          <div className={style.cta}>
            <PrimaryButton
              href={'https://www.bokadirekt.se/places/eskilstuna-kroppsbalansering-25963'}
            >
              <p>Boka tid direkt</p>
            </PrimaryButton>
            <SecondaryButton>
              <MdLocalPhone />
              <a
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: 'var(--rounded-full)',
                }}
                href='tel:010-000000'
              ></a>
              <p>010-000000</p>
            </SecondaryButton>
          </div>
          <div className={style.review}>
            <ReviewStar />
            <ReviewStar />
            <ReviewStar />
            <ReviewStar />
            <ReviewStar />
            <p>Över 300 nöjda kunder</p>
          </div>
        </div>
        <div className={style.right}>
          <Image src='/man.png' alt='hero image' width={600} height={500} />
        </div>
      </div>
    </div>
  );
}
