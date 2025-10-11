import style from './about-me.module.scss'

import PrimaryButton from '../button/primary-button'
import Image from 'next/image'
import Title from '../utils/title'
import LeafHill from '../graphics/home/leafhill'

export default function AboutMeOverview() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.left}>
          <div className={style['image-1']}>
            <Image
              src={'/lektion.webp'}
              alt=""
              fill
              priority
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 600px) 40vw, (max-width: 1024px) 50vw, 30vw"
            />
          </div>
          <div className={style['image-2']}>
            <Image
              src={'/om-mig.webp'}
              alt=""
              fill
              priority
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 600px) 40vw, (max-width: 1024px) 50vw, 30vw"
            />
          </div>
        </div>
        <div className={style.right}>
          <Title
            heading="Om mig"
            subHeading="Ralf Kedja"
            description="Mitt intresse för hälsa och friskvård har sina rötter i min uppväxt på landsbygden på Gotland, där min far arbetade som kiropraktor och akupunktör i nästan fem decennier. Han lärde mig tidigt vikten av att se till helheten när man arbetar med friskvård – att inte bara fokusera på symptomen, utan att behandla hela människan."
            left
          />
          <div
            style={{
              width: 'max-content',
            }}
          >
            <PrimaryButton href="/om-mig">
              <p>Läs mer</p>
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div className={style.hill}>
        <LeafHill />
      </div>
      <div className={style.hill2}></div>
    </div>
  )
}
