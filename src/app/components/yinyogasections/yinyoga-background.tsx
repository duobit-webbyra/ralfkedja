import React from 'react';
import style from '../treatments/treatment.module.scss';
import Title from '../utils/title';
import TreatmentItem from '../treatments/treatment-item';
import Image from 'next/image';
import assetPrefix from '@/app/utils/asset-prefix';

export default function YinyogaBackground() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style['title-image']}>
          <Title
            heading='Yinyoga'
            subHeading='Vad är Yinyoga?'
            description='Yinyoga är en modern yogastil med rötter i uråldriga traditioner som taoistisk filosofi, kinesisk medicin och klassisk yoga från Indien. Genom sin unika kombination av stillhet och djup stretch har yinyoga blivit en av de mest populära formerna av yoga för både kropp och själ. Namnet "yinyoga" är hämtat från den taoistiska filosofin om yin och yang – där yin representerar det lugna och passiva, medan yang symboliserar det aktiva och dynamiska. Yinyogan strävar efter att balansera dessa två principer genom att låta dig finna harmoni och fokusera på djupgående stretch och avslappning. '
            left
          />

          <div
            style={{
              position: 'relative',
              height: '320px',
              width: '100%',

              minHeight: '320px',
            }}
          >
            <Image
              src={assetPrefix('/yinyoga_yinyang.webp')}
              fill
              alt='Yin yang symbol'
              sizes='(max-width: 720px) 100vw, 50vw'
              style={{ objectFit: 'cover', background: 'var(--secondary-100)' }}
            />
          </div>
        </div>
        <div className={style['treatment-items']}>
          <TreatmentItem
            heading='Yinyogans historia'
            description='Yoga nådde Kina genom buddhistiska missionärer och handelsvägar som Sidenvägen, där dess filosofier blandades med daoistiska idéer om energi och balans. Daoistiska praktiker som qigong och tai chi inspirerade vidare utvecklingen. På 1970-talet skapade Paulie Zink grunden för yinyoga genom att förena taoistisk yoga med kinesisk medicin och kampsportens rörelser. Hans elev Paul Grilley populariserade stilen med fokus på anatomi och bindväv, medan Sarah Powers bidrog med mindfulness och buddhistisk meditation. Yinyoga är idag en global praktik som bygger på uråldriga traditioner från både Indien och Kina, och erbjuder en unik förening av stillhet och energi.'
          />
          <TreatmentItem
            heading='Varför ska man utöva Yinyoga?'
            description='Yinyogan handlar om att stanna kvar i positionerna, ofta mellan 3–5 minuter, och låta kroppen slappna av. Genom detta djupa arbete når du inte bara kroppen, utan även ditt inre – en möjlighet att skapa balans mellan fysisk, mental och energimässig hälsa.

Oavsett om du är nybörjare eller erfaren yogi kan yinyoga erbjuda en värdefull möjlighet till reflektion och återhämtning. Till skillnad från mer aktiva yogaformer undviker yinyoga prestation och intensitet. Istället handlar det om att släppa taget och minska stress. Med mindfulness som grund ökar självkännedom och självmedkänsla, och du får möjlighet att lyssna in kroppens signaler och behov.'
          />
        </div>
      </div>
    </div>
  );
}
