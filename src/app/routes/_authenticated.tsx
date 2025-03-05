import { useReactiveVar } from '@apollo/client';
import { authVar } from '@features/auth/globalAuthState';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';

const Authenticated = () => {
  const navigate = useNavigate();

  const { token } = useReactiveVar(authVar);

  if (!token) {
    navigate({ to: '/auth/login' });
  }

  return <Outlet />;
};

export const Route = createFileRoute('/_authenticated')({
  component: Authenticated,
});
