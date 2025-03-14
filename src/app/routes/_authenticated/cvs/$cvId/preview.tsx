import CVPreviewPage from '@pages/CVPreview';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/cvs/$cvId/preview')({
  component: RouteComponent,
});

function RouteComponent() {
  const { cvId } = Route.useParams();
  
  return <CVPreviewPage cvId={cvId} />;
}
