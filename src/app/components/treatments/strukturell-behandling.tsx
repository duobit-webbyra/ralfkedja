import React from 'react'
import style from './treatment.module.scss'
import Title from '../utils/title'
import TreatmentItem from './treatment-item'
import Image from 'next/image'

export default function StrukturellBehandling() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style['title-image']}>
          <Title
            heading="Strukturell Behandling"
            subHeading="Kotbalansering & Ackermannmetoden"
            description="Strukturell behandling syftar till att återställa normal funktion i ryggraden och kroppens leder genom manuella tekniker. Ackermannmetoden, som är en central del av behandlingen, används för att diagnostisera, behandla och förebygga rygg- och nacksmärtor, samt för att rehabilitera kroppen för ökad rörlighet och lindring av obalanser. "
            left
          />

          <div style={{ position: 'relative', height: '320px', width: '100%', minHeight: '320px' }}>
            <Image
              src={'/strukturell-behandling.webp'}
              fill
              alt="Strukturell behandling"
              sizes="(max-width: 720px) 100vw, 50vw"
              style={{ objectFit: 'cover', background: 'var(--secondary-100)' }}
            />
          </div>
        </div>
        <div className={style['treatment-items']}>
          <TreatmentItem
            heading="Hur går det till?"
            description="Terapeuten tillämpar specifika handgrepp och justeringstekniker för att mobilisera leder och ryggradsområden. Målet är att återställa normal funktion i leder, muskler och nervsystem, vilket hjälper till att förbättra rörelseomfång och minska smärta. Behandlingens omfattning och antalet sessioner anpassas utifrån patientens specifika besvär och hur länge de har pågått."
          />
          <TreatmentItem
            heading="Vilka besvär kan behandlas?"
            description="Strukturell behandling är effektiv för både akuta och kroniska smärttillstånd i rörelseapparaten. Vanliga problem som behandlas inkluderar rygg- och nacksmärtor, ryggskott, ischias, huvudvärk, migrän, yrsel, andnings- och matsmältningsbesvär, premenstruella smärtor, muskel- och ledvärk, tennisarmbåge, idrottsskador, förslitningsskador och stressrelaterade spänningar."
          />
        </div>
      </div>
    </div>
  )
}
