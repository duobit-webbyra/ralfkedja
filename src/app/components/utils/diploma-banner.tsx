import React from 'react';
import style from './diploma-banner.module.scss';
import Image from 'next/image';
import assetPrefix from '@/app/utils/asset-prefix';

const diplomas = [
  { src: 'kinesiologi.webp', alt: 'Diplom i kinesiologi' },
  { src: 'kiropraktik.webp', alt: 'Diplom i kiropraktik' },
  { src: 'osteopati.webp', alt: 'Diplom i osteopati' },
  { src: 'touch-for-health.webp', alt: 'Diplom i Touch For Health' },
];

export default function DiplomaBanner() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style['images-container']}>
          {diplomas.map((diploma, index) => (
            <div key={index} className={style['image-wrapper']}>
              <Image
                src={assetPrefix(diploma.src)}
                alt={diploma.alt}
                fill
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
