import CVsPage from '@pages/CVs';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/cvs/')({
  component: CVsPage,
});
