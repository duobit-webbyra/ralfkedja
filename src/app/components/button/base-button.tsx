import { Link } from '@/app/components/link/link';
import { ButtonProps } from './button-interface';
import style from './button-style.module.scss';

export default function BaseButton({ href, ...props }: ButtonProps) {
  return (
    <button {...props}>
      {href && <Link className={style.link} href={`${href}`}></Link>}
      {props.children}
    </button>
  );
}
