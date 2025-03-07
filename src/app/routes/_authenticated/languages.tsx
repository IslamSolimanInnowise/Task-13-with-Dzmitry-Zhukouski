import LanguagesPage from '@pages/Languages';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/languages')({
  component: LanguagesPage,
});
