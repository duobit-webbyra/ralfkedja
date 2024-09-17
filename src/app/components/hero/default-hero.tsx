import React from 'react';
import style from './default-hero.module.scss';
import Image from 'next/image';

import assetPrefix from '@/app/utils/asset-prefix';

export interface DefaultHeroProps {
  title: string;
}

export default function DefaultHero({ title }: DefaultHeroProps) {
  return (
    <div className={style.container}>
      <Image src={assetPrefix('herobg.png')} alt='' fill />
      {title}
    </div>
  );
}
