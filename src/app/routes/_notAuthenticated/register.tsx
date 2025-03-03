import RegisterPage from '@pages/Register';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_notAuthenticated/register')({
  component: RegisterPage,
});