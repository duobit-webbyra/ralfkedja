import style from './about-me.module.scss';

import PrimaryButton from '../button/primary-button';
import Image from 'next/image';
import Title from '../utils/title';
import LeafHill from '../graphics/home/leafhill';
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
          <Title
            heading='Om mig'
            subHeading='Lorem ipsum'
            description='Mitt intresse för hälsa och friskvård grundar sig i att jag är uppvuxen på landet på Gotland där min far verkade som kiropraktor och akupunktör under nästan fem decenium. Betydelsen av helheten när man jobbar med friskvård lärde mig min far mig tidigt, att inte bara behandla symtomer utan hela människan.  '
            left
          />
          <div
            style={{
              width: 'max-content',
            }}
          >
            <PrimaryButton href='/om-mig'>Läs mer</PrimaryButton>
          </div>
        </div>
      </div>
      <div className={style.hill}>
        <LeafHill />
      </div>
      <div className={style.hill2}></div>
    </div>
  );
}
