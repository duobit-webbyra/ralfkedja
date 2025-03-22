import React from 'react';
import clsx from 'clsx';

interface Props extends React.ComponentProps<'div'> {
  children: React.ReactNode;
}

export default function Container({ children, className, ...rest }: Props) {
  return (
    <div
      {...rest}
      className={clsx(
        className,
        '!mx-auto !w-full px-16',
        'min-[1280px]:!w-[1280px]',
        'min-[1280px]:!px-0',
      )}
    >
      {children}
    </div>
  );
}
