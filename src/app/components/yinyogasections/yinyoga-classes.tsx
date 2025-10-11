import React from 'react'
import style from '../treatments/treatment.module.scss'
import Title from '../utils/title'
import Image from 'next/image'

export default function YinyogaClasses() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style['title-image']}>
          <Title
            heading="Klasser"
            subHeading="Träna Yinyoga"
            description="Kom och träna yinyoga i en avslappnad miljö på Munktellarenan. Här får du möjlighet att stanna i mjuka positioner, släppa på spänningar och återfå energin. Fokus ligger på att skapa balans genom långsam och medveten rörelse, där kroppen får tid att sträcka ut och sinnet kan hitta stillhet.

Oavsett om du är ute efter att öka din rörlighet eller bara hitta ett lugn i vardagen, är yinyogan en perfekt paus för både kropp och själ. Klicka in dig på min tidbokningssida för att köpa klippkort."
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
              src={'/yinyoga_class.webp'}
              fill
              priority
              alt="Yinyoga klass"
              sizes="(max-width: 720px) 100vw, 50vw"
              style={{ objectFit: 'cover', background: 'var(--secondary-100)' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
