import LoginPage from '@pages/Login';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_notAuthenticated/auth/login')({
  component: LoginPage,
});
