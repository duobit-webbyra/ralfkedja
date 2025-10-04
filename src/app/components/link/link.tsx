import React from 'react';

interface LinkProps extends React.ComponentProps<'a'> {
  href: string;
}

export function Link(props: LinkProps) {
  return <a {...props} />;
}
