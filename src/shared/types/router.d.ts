import { router } from '@shared/router';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
