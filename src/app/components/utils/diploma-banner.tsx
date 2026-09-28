'use client'

import React, { useState } from 'react'
import style from './diploma-banner.module.scss'
import Image from 'next/image'
import ImageModal from './image-modal'

const diplomas = [
  { src: '/kinesiologi.webp', alt: 'Diplom i kinesiologi' },
  { src: '/kiropraktik.webp', alt: 'Diplom i kiropraktik' },
  { src: '/osteopati.webp', alt: 'Diplom i osteopati' },
  { src: '/tfhinstructor_cert.jpeg', alt: 'Diplom i Touch For Health' },
  { src: '/kostradgivare_cert.jpeg', alt: 'Kostrådgivare' },
  { src: '/biomagnetism_cert.jpeg', alt: 'Diplom i Biomagnetism' },
]

export default function DiplomaBanner() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)

  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style['images-container']}>
            {diplomas.map((diploma, index) => (
              <div
                key={index}
                className={style['image-wrapper']}
                onClick={() => setSelectedImage(diploma)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedImage(diploma)
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Klicka för att förstora ${diploma.alt}`}
              >
                <Image
                  src={diploma.src}
                  alt={diploma.alt}
                  fill
                  priority
                  className={style['image-element']}
                  sizes="(max-width: 600px) 35vw,(max-width: 1024) 45vw, 12vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedImage && (
        <ImageModal
          isOpen={true}
          onClose={() => setSelectedImage(null)}
          src={selectedImage.src}
          alt={selectedImage.alt}
        />
      )}
    </>
  )
}
