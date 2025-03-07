import { useReactiveVar } from '@apollo/client';
import { authVar } from '@shared/store/globalAuthState';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

const Authenticated = () => {
  const { accessToken } = useReactiveVar(authVar);

  if (!accessToken) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};

export const Route = createFileRoute('/_authenticated')({
  component: Authenticated,
});
