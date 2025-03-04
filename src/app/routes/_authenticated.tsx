import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

const Authenticated = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate({ to: '/login' });
    }
  }, [navigate]);

  return <Outlet />;
};

export const Route = createFileRoute('/_authenticated')({
  component: Authenticated,
});
