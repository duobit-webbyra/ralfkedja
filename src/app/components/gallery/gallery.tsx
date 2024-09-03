import React, { useEffect, useState } from 'react';
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
      {data.length > 0 ? (
        <div className={style['gallery-container']}>
          {data.map((item, index) => (
            <div key={index} className={style['gallery-item']}>
              <div className={style.images}>
                <Image
                  key={index}
                  src={`${(item.images as Media).url}`}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Inga bilder uppladdade för tillfället</p>
      )}
    </div>
  );
};

export default GalleryGrid;
