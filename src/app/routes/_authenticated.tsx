import { useReactiveVar } from '@apollo/client';
import { authVar } from '@shared/store/globalAuthState';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';

const Authenticated = () => {
  const navigate = useNavigate();

  const { accessToken } = useReactiveVar(authVar);

  if (!accessToken) {
    navigate({ to: '/auth/login' });
  }

  return <Outlet />;
};

export const Route = createFileRoute('/_authenticated')({
  component: Authenticated,
});
