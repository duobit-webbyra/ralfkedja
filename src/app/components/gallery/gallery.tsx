import React from 'react'
import style from './gallery.module.scss'
import Image from 'next/image'
import { Link } from '@/app/components/link/link'

// Hardcoded gallery images - add your image paths here
const galleryImages = [
  {
    src: '/gallery/image1.jpg',
    alt: 'Behandling bild 1',
  },
  {
    src: '/gallery/image2.jpg',
    alt: 'Behandling bild 2',
  },
  {
    src: '/gallery/image3.jpg',
    alt: 'Behandling bild 3',
  },
  {
    src: '/gallery/image4.jpg',
    alt: 'Behandling bild 4',
  },
  {
    src: '/gallery/image5.jpg',
    alt: 'Behandling bild 5',
  },
  {
    src: '/gallery/image6.jpg',
    alt: 'Behandling bild 6',
  },
  // Add more images here as needed
]

const GalleryGrid = () => {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <p
          className={style.photographer}
          style={{ display: 'flex', width: '100%', justifyContent: 'end', fontStyle: 'italic' }}
        >
          Fotograf:&nbsp;<Link href="https://www.nomeskilstuna.se/">N&M Eskilstuna</Link>
        </p>
        {galleryImages && galleryImages.length > 0 ? (
          <div className={style['gallery-container']}>
            {galleryImages.map((item, index) => (
              <div key={index} className={style['gallery-item']}>
                <div>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                    sizes="(max-width: 720px) 90vw,(max-width: 1440px) 45vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Inga bilder uppladdade för tillfället</p>
        )}
      </div>
    </div>
  )
}

export default GalleryGrid
