import React from 'react';

interface ButtonBase {
  children?: React.ReactNode;
  href?: string;
  submit?: boolean;
}

interface ButtonWithLink extends ButtonBase {
  submit?: undefined;
  href?: string;
}

interface ButtonWithSubmit extends ButtonBase {
  submit: true;
  href?: undefined;
}

export type ButtonProps = ButtonWithLink | ButtonWithSubmit;
