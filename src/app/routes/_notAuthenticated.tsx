import { useReactiveVar } from '@apollo/client';
import { authVar } from '@features/auth/globalAuthState';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';

const NotAuthenticated = () => {
  const navigate = useNavigate();

  const { token, id } = useReactiveVar(authVar);

  if (token && id) {
    navigate({
      to: '/users/$userId',
      params: { userId: id },
    });
  }

  return <Outlet />;
};

export const Route = createFileRoute('/_notAuthenticated')({
  component: NotAuthenticated,
});
