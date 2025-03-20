import ProfilePage from '@pages/Profile';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/users/$userId/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();
  return <ProfilePage userId={userId} />;
}
