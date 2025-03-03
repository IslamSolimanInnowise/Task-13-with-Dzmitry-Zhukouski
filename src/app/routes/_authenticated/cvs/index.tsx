import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/cvs/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/cvs/"!</div>
}
