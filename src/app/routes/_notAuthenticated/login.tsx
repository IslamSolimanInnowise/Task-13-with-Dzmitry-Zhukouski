import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_notAuthenticated/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_notAuthenticated/login"!</div>
}
