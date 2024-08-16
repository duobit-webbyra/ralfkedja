import React from 'react';
import style from './review-card.module.scss';
export interface ReviewCardProps {
  reviewmessage: string;
  reviewauthor: string;
}

export default function ReviewCard({ reviewmessage, reviewauthor }: ReviewCardProps) {
  return (
    <div className={style.container}>
      <div className={style.textcontainer}>
        <span
          className={style.text}
          style={{ fontSize: '64px', color: 'var(--tertiary-100)', height: '64px' }}
        >
          "
        </span>
        <p className={style.text}>{reviewmessage}</p>
      </div>

      <p className={style.reviewauthor}>{reviewauthor}</p>
    </div>
  );
}
