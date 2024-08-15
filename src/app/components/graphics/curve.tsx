import React from 'react';

interface CurveProps {
  fillColor: string;
}

export default function Curve({ fillColor }: CurveProps) {
  return (
    <svg viewBox='0 0 1440 61' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M0 0H1440C1440 0 1197.85 60.231 739 60.231C280.152 60.231 0 0 0 0Z'
        fill={fillColor}
      />
    </svg>
  );
}
