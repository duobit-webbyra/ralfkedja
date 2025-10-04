import React from 'react';
import style from './principle-card.module.scss';

interface PrincipleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function PrincipleCard({ title, description, icon }: PrincipleCardProps) {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.text}>
          <div className={style.title}>
            {icon}
            <h1>{title}</h1>
          </div>

          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
