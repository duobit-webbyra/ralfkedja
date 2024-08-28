import React from 'react';
import style from './default-hero.module.scss';

export interface DefaultHeroProps {
  title: string;
}

export default function DefaultHero({ title }: DefaultHeroProps) {
  return <div className={style.container}>{title}</div>;
}
