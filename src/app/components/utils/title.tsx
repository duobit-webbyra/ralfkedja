import style from './title.module.scss';
import React from 'react';
interface TitleProps {
  heading: string;
  subHeading: string;
  description: string | string[]; // Allow description to be either a string or an array of strings
  inverse?: boolean;
  left?: boolean;
}

export default function Title(props: TitleProps) {
  return (
    <div
      className={`${style.container} ${props.inverse && style.inverse} ${props.left && style.left}`}
    >
      <h1>{props.heading}</h1>
      <h2>{props.subHeading}</h2>
      {Array.isArray(props.description) ? (
        props.description.map((paragraph, index) => <p key={index}>{paragraph}</p>)
      ) : (
        <p>{props.description}</p>
      )}
    </div>
  );
}
