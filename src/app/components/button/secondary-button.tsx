import { ButtonProps } from './button-interface';

import BaseButton from './base-button';

import style from './button-style.module.scss';
export default function SecondaryButton(props: Omit<ButtonProps, 'className'>) {
  return (
    <BaseButton className={style['secondary-button']} {...props}>
      {props.children}
    </BaseButton>
  );
}
