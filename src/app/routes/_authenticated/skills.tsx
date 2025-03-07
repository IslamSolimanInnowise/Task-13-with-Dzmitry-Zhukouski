import SkillsPage from '@pages/Skills';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/skills')({
  component: SkillsPage,
});
