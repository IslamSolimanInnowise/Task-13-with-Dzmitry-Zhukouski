import CVDetailsPage from '@pages/CVDetails';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/cvs/$cvId/details')({
  component: RouteComponent,
});

function RouteComponent() {
  const { cvId } = Route.useParams();
  
  return <CVDetailsPage cvId={cvId} />;
}
