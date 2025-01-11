import React from 'react';
import style from './gallery.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import config from '@payload-config';
import { getPayload } from 'payload';
import type { Media } from '@payload-types';

const GalleryGrid = async () => {
  const payload = await getPayload({ config });
  const data = await payload.findGlobal({
    slug: 'gallery',
  });

  return (
    <div className={style.container}>
      <div className={style.content}>
        <p
          className={style.photographer}
          style={{ display: 'flex', width: '100%', justifyContent: 'end', fontStyle: 'italic' }}
        >
          Fotograf:&nbsp;<Link href='https://www.nomeskilstuna.se/'>N&M Eskilstuna</Link>
        </p>
        {data?.images && data.images.length > 0 ? (
          <div className={style['gallery-container']}>
            {data.images.map(
              (item, index) =>
                (item.image as Media).url && (
                  <div key={index} className={style['gallery-item']}>
                    <div>
                      <Image
                        key={index}
                        src={`${(item.image as Media).url}`}
                        alt={`${(item.image as Media).alt}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes='(max-width: 720px) 90vw,(max-width: 1440px) 45vw, 50vw'
                      />
                    </div>
                  </div>
                ),
            )}
          </div>
        ) : (
          <p>Inga bilder uppladdade för tillfället</p>
        )}
      </div>
    </div>
  );
};

export default GalleryGrid;
