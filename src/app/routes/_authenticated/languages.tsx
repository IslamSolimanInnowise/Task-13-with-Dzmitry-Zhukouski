import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/languages')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/languages/"!</div>;
}
