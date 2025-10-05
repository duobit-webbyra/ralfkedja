import style from './treatment-item.module.scss';
import Leaf from '../graphics/leaf';
import React, { ReactNode } from 'react';

interface TreatmentSectionProps {
  heading: string;
  children: ReactNode;
}

export default function TreatmentSection({ heading, children }: TreatmentSectionProps) {
  return (
    <div className={style.container}>
      <div className={style.title}>
        <div style={{ height: '32px', width: '32px', rotate: '260deg', flexShrink: 0 }}>
          <Leaf />
        </div>
        <h1>{heading}</h1>
      </div>
      <div>{children}</div>
    </div>
  );
}
