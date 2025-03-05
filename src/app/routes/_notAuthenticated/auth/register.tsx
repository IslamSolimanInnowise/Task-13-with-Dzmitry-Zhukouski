import RegisterPage from '@pages/Register';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_notAuthenticated/auth/register')({
  component: RegisterPage,
});