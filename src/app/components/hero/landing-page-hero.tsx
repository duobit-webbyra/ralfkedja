import { MdLocalPhone } from 'react-icons/md'
import Image from 'next/image'
import ReviewStar from '../graphics/review-star'
import BookDirectly from '../utils/book-directly'

import config from '@payload-config'
import { getPayload } from 'payload'
import style from './landing-page-hero.module.scss'
import PrimaryButton from '../button/primary-button'

async function PhoneNumber() {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({
    slug: 'contact',
  })

  return (
    <PrimaryButton>
      <a
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: 'var(--rounded-full)',
        }}
        href={`tel:${data.phone}`}
      ></a>

      <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MdLocalPhone />
        {data.phone}
      </p>
    </PrimaryButton>
  )
}

export default function LandingPageHero() {
  return (
    <div className={style.container}>
      <Image
        src={'/nature.webp'}
        alt=""
        fill
        style={{
          objectFit: 'cover',
          backgroundPosition: 'center',
        }}
        sizes="100vh"
      />
      <div className={style.gradient} />
      <div className={style.content}>
        <div className={style.left}>
          <div className={style.text}>
            <h1>Balans för Kropp och Själ</h1>
            <p>
              Friskvårdande behandlingar inom kiropraktik, kinesiologi, och biomagnetism för att
              främja ett hälsosammare liv.
            </p>
          </div>
          <div className={style.cta}>
            <BookDirectly>Boka tid direkt</BookDirectly>
            <PhoneNumber />
          </div>
          <div className={style.review}>
            <div style={{ display: 'flex' }}>
              <ReviewStar />
              <ReviewStar />
              <ReviewStar />
              <ReviewStar />
              <ReviewStar />
            </div>
            <p style={{ fontSize: '16px' }}>Över 20 000 utförda behandlingar</p>
          </div>
        </div>
        <div className={style.right}>
          <div style={{ position: 'relative', height: '95%', width: '350px' }}>
            <Image
              src={'/ralf-hem.webp'}
              alt="Ralf Kedja - Kroppsbalansering, Eskilstuna"
              fill
              style={{ objectFit: 'contain' }}
              sizes="80vw"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
