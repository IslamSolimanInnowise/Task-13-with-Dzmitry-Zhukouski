import ProfileLanguagesPage from '@pages/ProfileLanguages';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/users/$userId/languages')(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  const { userId } = Route.useParams();
  return <ProfileLanguagesPage userId={userId} />;
}
