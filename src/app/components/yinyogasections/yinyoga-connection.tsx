import React from 'react'
import style from '../treatments/treatment.module.scss'
import Title from '../utils/title'
import Image from 'next/image'
import TreatmentItem from '../treatments/treatment-item'

export default function YinYogaConnections() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={`${style['title-image']} ${style.reverse}`}>
          <Title
            heading="Min koppling till Yinyoga"
            subHeading="Yinyoga och kinesiologi"
            description="Yinyoga och kinesiologi har en naturlig koppling i sitt gemensamma fokus på att främja kroppens balans och funktion. Där kinesiologin arbetar med att identifiera och korrigera obalanser genom muskeltester och energiflöden, erbjuder yinyogan ett praktiskt sätt att stödja dessa processer genom rörelse och avslappning.

Genom att hålla mjuka, passiva positioner under längre tid stimulerar yinyogan kroppens bindväv, leder och ligament. Detta förbättrar inte bara rörlighet och cirkulation utan hjälper också till att släppa på spänningar och blockeringar som kan påverka kroppens energiflöde. Yinyogan skapar ett tillstånd där nervsystemet får chans att gå ner i varv, vilket stödjer återhämtning och läkning – något som också är centralt inom kinesiologin."
            left
          />
          <div style={{ position: 'relative', height: '370px', width: '100%', minHeight: '320px' }}>
            <Image
              src={'/yinyoga_ralf.webp'}
              fill
              alt="Yinyoga Ralf Kedja"
              sizes="(max-width: 720px) 100vw, 50vw"
              style={{ objectFit: 'cover', background: 'var(--secondary-100)' }}
            />
          </div>
        </div>
        <div className={style['treatment-items']}>
          <TreatmentItem
            heading="Yinyoga och kampsport"
            description="Yinyoga och kampsport delar en gemensam grund i östasiatiska traditioner där kroppens energi, balans och styrka står i centrum. Med rötter i den kinesiska kampsportens filosofi fokuserar yinyogan på att stärka kroppens bindväv, leder och energiflöde (qi), vilket skapar en stabil grund för både rörelse och stillhet.

Precis som i kampsport handlar yinyoga om mer än fysisk träning – det är en väg till harmoni mellan kropp och sinne. Genom att landa i kroppen, skapa utrymme i lederna och låta energin flöda fritt, bygger du både smidighet och motståndskraft. Yinyogan stärker din flexibilitet, förbättrar din kroppsmedvetenhet och andning, och hjälper dig att släppa spänningar."
          />
        </div>
      </div>
    </div>
  )
}
