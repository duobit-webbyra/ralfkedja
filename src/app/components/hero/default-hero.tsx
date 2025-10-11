import React from 'react'
import Image from 'next/image'
import style from './default-hero.module.scss'
import Container from '@/app/components/essentials/Container'
export interface DefaultHeroProps {
  title: string
  description?: string
}

export default function DefaultHero({ title, description }: DefaultHeroProps) {
  return (
    <div className={style.container}>
      <Container>
        <Image src="/nature3.webp" alt="Hero Default Image" fill className={style.image} priority />
        <div className={style.overlay}></div>
        <h1 className={style.title}>{title}</h1>
        {description && <p className={style.description}>{description}</p>}
      </Container>
    </div>
  )
}
