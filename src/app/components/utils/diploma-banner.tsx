import React from 'react';
import style from './diploma-banner.module.scss';
import Image from 'next/image';

const diplomas = [
  { id: 1, src: '/kinesiologi.webp', alt: 'Diplom i kinesiologi' },
  { id: 2, src: '/kiropraktik.webp', alt: 'Diplom i kiropraktik' },
  { id: 3, src: '/osteopati.webp', alt: 'Diplom i osteopati' },
  { id: 4, src: '/touch-for-health.webp', alt: 'Diplom i Touch For Health' },
];

export default function DiplomaBanner() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style['images-container']}>
          {diplomas.map((diploma) => (
            <div key={diploma.id} className={style['image-wrapper']}>
              <Image
                src={diploma.src}
                alt={diploma.alt}
                layout='fill'
                className={style['image-element']}
                sizes='(max-width: 600px) 35vw,(max-width: 1024) 45vw, 12vw'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
