import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

const Authenticated = () => {
  const isAuth = false;

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export const Route = createFileRoute('/_authenticated')({
  component: Authenticated,
});
