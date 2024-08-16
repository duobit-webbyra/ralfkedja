interface TitleProps {
  heading: string;
  subHeading: string;
  description: string;
  inverse?: boolean;
  left?: boolean;
}

import style from './title.module.scss';

export default function Title(props: TitleProps) {
  return (
    <div
      className={`${style.container} ${props.inverse && style.inverse} ${props.left && style.left}
}`}
    >
      <h1>{props.heading}</h1>
      <h2>{props.subHeading}</h2>
      <p>{props.description}</p>
    </div>
  );
}
