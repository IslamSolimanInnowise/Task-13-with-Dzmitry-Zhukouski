import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/skills')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/skills/"!</div>;
}
