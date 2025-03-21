import ProfileSkillsPage from '@pages/ProfileSkills';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/users/$userId/skills')({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();
  return <ProfileSkillsPage userId={userId} />;
}
