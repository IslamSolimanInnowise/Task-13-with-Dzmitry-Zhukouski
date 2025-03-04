import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

const NotAuthenticated = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate({
        to: '/users/$userId',
        params: { userId: localStorage.getItem('id')! },
      });
    }
  }, [navigate]);

  return <Outlet />;
};

export const Route = createFileRoute('/_notAuthenticated')({
  component: NotAuthenticated,
});
