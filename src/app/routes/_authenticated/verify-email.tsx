import VerifyMailPage from '@pages/VerifyEmail';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/verify-email')({
  component: VerifyMailPage,
});
