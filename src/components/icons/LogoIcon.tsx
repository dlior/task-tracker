import { createIcon } from '@chakra-ui/react';

export const LogoIcon = createIcon({
  displayName: 'LogoIcon',
  viewBox: '0 0 100 100',
  path: [
    <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
      <stop offset='0%' style={{ stopColor: '#6336f1' }} />
      <stop offset='100%' style={{ stopColor: '#1da5f1' }} />
    </linearGradient>,
    <circle cx='50' cy='50' r='50' fill='url(#gradient)' />,
    <path
      d='M30 50 L45 65 L70 35'
      fill='none'
      stroke='#ffffff'
      strokeWidth='10'
    />,
  ],
});
