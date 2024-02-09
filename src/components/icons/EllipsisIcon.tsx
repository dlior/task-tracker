import { createIcon } from '@chakra-ui/react';

export const EllipsisIcon = createIcon({
  displayName: 'EllipsisIcon',
  viewBox: '0 0 64 16',
  path: [
    <circle cx='8' cy='8' r='4' fill='#000' />,
    <circle cx='32' cy='8' r='4' fill='#000' />,
    <circle cx='56' cy='8' r='4' fill='#000' />,
  ],
});
