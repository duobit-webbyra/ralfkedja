import Link from 'next/link';
import { ButtonProps } from './button-interface';

import style from './button-style.module.scss';
export default function SecondaryButton(props: ButtonProps) {
  return (
    <button className={style['secondary-button']}>
      {props.href && <Link className={style.link} href={props.href}></Link>}
      {props.children}
    </button>
  );
}
