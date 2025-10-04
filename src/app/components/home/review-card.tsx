import React from 'react';
import style from './review-card.module.scss';
export interface ReviewCardProps {
  reviewMessage: string;
  reviewAuthor: string;
}

export default function ReviewCard({ reviewMessage, reviewAuthor }: ReviewCardProps) {
  return (
    <div className={style.container}>
      <div className={style['text-container']}>
        <i
          className={style.text}
          style={{ fontSize: '64px', color: 'var(--tertiary-100)', height: '64px' }}
        >
          {'"'}
        </i>
        <p className={style.text}>{reviewMessage}</p>
      </div>

      <i className={style['review-author']}>- {reviewAuthor}</i>
    </div>
  );
}
