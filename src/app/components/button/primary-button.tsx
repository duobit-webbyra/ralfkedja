import { ButtonProps } from './button-interface';
import BaseButton from './base-button';
import style from './button-style.module.scss';

export default function PrimaryButton(props: Omit<ButtonProps, 'className'>) {
  return (
    <BaseButton className={style['primary-button']} {...props}>
      {props.children}
    </BaseButton>
  );
}
