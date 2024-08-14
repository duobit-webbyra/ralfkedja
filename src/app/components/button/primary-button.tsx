import Link from 'next/link';
import { ButtonProps } from './button-interface';

import style from './button-style.module.scss';
export default function PrimaryButton(props: ButtonProps) {
  return (
    <button className={style['primary-button']}>
      {props.href && <Link className={style.link} href={props.href}></Link>}
      {props.children}
    </button>
  );
}
