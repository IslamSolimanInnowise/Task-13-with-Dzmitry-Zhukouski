import { useReactiveVar } from '@apollo/client';
import { authVar } from '@shared/store/globalAuthState';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';

const Authenticated = () => {
  const navigate = useNavigate();

  const { access_token } = useReactiveVar(authVar);

  if (!access_token) {
    navigate({ to: '/auth/login' });
  }

  return <Outlet />;
};

export const Route = createFileRoute('/_authenticated')({
  component: Authenticated,
});
