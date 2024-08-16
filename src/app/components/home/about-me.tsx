import React from 'react';
import style from './about-me.module.scss';
import Image from 'next/image';
import PlantCurve from '../graphics/plantcurve';
import PrimaryButton from '../button/primary-button';
export default function AboutMe() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.images}>
          <div className={style.imageWrapper1}>
            <Image
              src='/procedure.jpg'
              alt='exempelbild'
              fill
              priority
              placeholder='blur'
              blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=='
              objectFit='cover'
            />
          </div>
          <div className={style.imageWrapper2}>
            <Image
              src='/lecture.jpg'
              alt='exempelbild'
              fill
              priority
              placeholder='blur'
              blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=='
              objectFit='cover'
            />
          </div>
        </div>
        <div className={style.details}>
          <div className={style.text}>
            <h1>Om mig</h1>
            <h2>Din guide till helhetsbalans</h2>
            <p>
              Med flera års erfarenhet inom kroppsbalansering, kinesiologi, och kostrådgivning, har
              jag dedikerat mitt liv till att hjälpa människor nå en djupare förståelse för sin
              hälsa. Genom att kombinera traditionella och alternativa metoder strävar jag efter att
              skapa en holistisk väg för varje individ, där kropp och själ kan samverka i harmoni.
              Jag brinner för att se mina klienter växa och finna balans i sina liv, och jag är här
              för att stödja dig på din resa mot optimal hälsa.
            </p>
          </div>
          <PrimaryButton>Läs mer</PrimaryButton>
        </div>
      </div>
    </div>
  );
}
