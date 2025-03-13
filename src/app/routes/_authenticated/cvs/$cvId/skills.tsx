import CVSkillsPage from '@pages/CVSkills';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/cvs/$cvId/skills')({
  component: RouteComponent,
});

function RouteComponent() {
  const { cvId } = Route.useParams();
  return <CVSkillsPage cvId={cvId} />;
}
