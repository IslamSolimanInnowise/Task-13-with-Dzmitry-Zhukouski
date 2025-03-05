import ResetPasswordPage from '@pages/ResetPassword';
import { createFileRoute, useLocation } from '@tanstack/react-router';

export const Route = createFileRoute('/_notAuthenticated/reset-password')({
  component: RouteComponent,
});

function RouteComponent() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const token = searchParams.get('token');

  return <ResetPasswordPage token={token} />;
}
