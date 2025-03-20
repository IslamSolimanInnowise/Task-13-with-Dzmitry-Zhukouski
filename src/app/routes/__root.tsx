import { Page404 } from '@pages/Page404';
import i18n from '@shared/i18n/config';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import React, { useEffect } from 'react';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: Page404,
});

function RootComponent() {
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, []);

  return (
    <React.Fragment>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </React.Fragment>
  );
}
