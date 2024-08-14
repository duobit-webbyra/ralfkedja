import React from 'react';

interface TreatmentCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

import style from './treatment-card.module.scss';
import PrimaryButton from '../button/primary-button';

export default function TreatmentCard({ title, description, href, icon }: TreatmentCardProps) {
  if (title.length === 0 || description.length === 0) {
    throw Error('Please set an title');
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.text}>
          {icon}
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className={style.button}>
          <PrimaryButton>
            <p>Läs mer</p>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
