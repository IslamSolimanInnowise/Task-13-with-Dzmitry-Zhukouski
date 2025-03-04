import '@chakra-ui/react';

import { LinkProps } from '@tanstack/react-router';

declare module '@chakra-ui/react' {
  interface ButtonProps {
    to?: LinkProps['to'];
    params?: LinkProps['params'];
  }
}
