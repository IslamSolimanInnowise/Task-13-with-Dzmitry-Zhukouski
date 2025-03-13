import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/cvs/$cvId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { cvId } = Route.useParams();
  return <div>Hello "/_authenticated/cvs/{cvId}"!</div>
}