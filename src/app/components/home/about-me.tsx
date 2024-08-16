import style from './about-me.module.scss';

import PrimaryButton from '../button/primary-button';

import Image from 'next/image';

export default function AboutMeOverview() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.left}>
          <div className={style['image-1']}>
            <Image src='/procedure.jpg' alt='' fill style={{ objectFit: 'cover' }} />
          </div>
          <div className={style['image-2']}>
            <Image src='/lecture.jpg' alt='' fill style={{ objectFit: 'cover' }} />
          </div>
        </div>
        <div className={style.right}>
          <div className={style.text}>
            <h1>Om mig</h1>
            <h2>Lorem ipsum sato ackti.</h2>
            <p></p>
          </div>
          <PrimaryButton>Läs mer</PrimaryButton>
        </div>
      </div>
      <div className={style.hill}></div>
    </div>
  );
}
