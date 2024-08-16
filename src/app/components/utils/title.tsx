interface TitleProps {
  heading: string;
  subHeading: string;
  description: string;
  inverse?: boolean;
}

import style from './title.module.scss';

export default function Title(props: TitleProps) {
  return (
    <div className={`${style.container} ${props.inverse && style.inverse}`}>
      <h1>{props.heading}</h1>
      <h2>{props.subHeading}</h2>
      <p>{props.description}</p>
    </div>
  );
}
