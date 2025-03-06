import { useReactiveVar } from '@apollo/client';
import { authVar } from '@shared/store/globalAuthState';
import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';

const NotAuthenticated = () => {
  const { accessToken, id } = useReactiveVar(authVar);

  if (accessToken && id) {
    return <Navigate to="/users/$userId" params={{ userId: id }} />;
  }

  return <Outlet />;
};

export const Route = createFileRoute('/_notAuthenticated')({
  component: NotAuthenticated,
});
