import CVProjectsPage from '@pages/CVProjects';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/cvs/$cvId/projects')({
  component: RouteComponent,
});

function RouteComponent() {
  const { cvId } = Route.useParams();
  return <CVProjectsPage cvId={cvId} />;
}