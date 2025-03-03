import { createFileRoute } from '@tanstack/react-router';
import LoginForm from '@widgets/LoginForm';

export const Route = createFileRoute('/_notAuthenticated/login')({
  component: LoginForm,
});
