import { createFileRoute } from '@tanstack/react-router'
import { useActiveUserStore } from '@renderer/stores/user'
import axios from 'axios'

export const Route = createFileRoute('/')({
  component: RouteComponent
})

function RouteComponent() {
  const user = useActiveUserStore((s) => s)

  return <div>
    <button onClick={()=>{}} className='px-5 py-2 bg-neutral-300'>user.{user.name}</button>
  </div>
}
