import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/apps')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="h-screen mx-6 my-6">
      <Outlet />
    </div>
  )
}
