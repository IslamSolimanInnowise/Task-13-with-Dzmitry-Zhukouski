import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

const NotAuthenticated = () => {
  const isAuth = false;

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export const Route = createFileRoute('/_notAuthenticated')({
  component: NotAuthenticated,
});
