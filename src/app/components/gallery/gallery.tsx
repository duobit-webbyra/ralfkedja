import React from 'react';
import style from './gallery.module.scss';
import Image from 'next/image';
import config from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import type { Media } from '@payload-types';

const GalleryGrid = async () => {
  const payload = await getPayloadHMR({ config });
  const { docs: data } = await payload.find({
    collection: 'gallery',
  });

  console.log(data);

  return (
    <div className={style.container}>
      <div className={style.content}>
        <p
          className={style.photographer}
          style={{ display: 'flex', width: '100%', justifyContent: 'end', fontStyle: 'italic' }}
        >
          Fotograf: Nikola Damjanovic
        </p>
        {data.length > 0 ? (
          <div className={style['gallery-container']}>
            {data.map((item, index) => (
              <div key={index} className={style['gallery-item']}>
                <div>
                  <Image
                    key={index}
                    src={`${(item.images as Media).url}`}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes='(max-width: 720px) 90vw,(max-width: 1440px) 45vw, 50vw'
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
  );
};

export default GalleryGrid;
