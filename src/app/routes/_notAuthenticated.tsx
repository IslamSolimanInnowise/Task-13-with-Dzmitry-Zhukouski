import { useReactiveVar } from '@apollo/client';
import { authVar } from '@shared/store/globalAuthState';
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';

const NotAuthenticated = () => {
  const navigate = useNavigate();

  const { accessToken, id } = useReactiveVar(authVar);

  if (accessToken && id) {
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
