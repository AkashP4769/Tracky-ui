import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { create } from 'zustand/react'
import { useActiveUserStore, type ActiveUserStore } from '@renderer/stores/user'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent
})

function RouteComponent() {
  const setUser = useActiveUserStore((s) => s.setUser)

  async function fetchActiveUser() {
      try {
        console.log('Fetching active user...')
        const response = await axios.get('http://localhost:5000/api/user/active')
        setUser(
          response.data.id,
          response.data.name,
          response.data.is_active
        )
      } catch (error) {
        console.error('Error fetching active user:', error)
      }
    }

  useEffect(() => {
    console.log('Route mounted') // 👈 this WILL run

    fetchActiveUser()
  }, [setUser])

  return <div>
    <button onClick={()=>{fetchActiveUser();}} className='px-5 py-2 bg-neutral-300'>click me</button>
  </div>
}
