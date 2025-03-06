import ResetPasswordPage from '@pages/ResetPassword';
import { createFileRoute, useSearch } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

const resetPasswordSearchSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export const Route = createFileRoute('/_notAuthenticated/reset-password')({
  component: RouteComponent,
  validateSearch: zodValidator(resetPasswordSearchSchema),
});

function RouteComponent() {
  const { token } = useSearch({ from: Route.id });

  return <ResetPasswordPage token={token} />;
}
