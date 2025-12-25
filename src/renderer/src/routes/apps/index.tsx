import { createFileRoute } from '@tanstack/react-router'
// import usestate from 'react-usestateref'
import { useState, useEffect } from 'react'
// import app from models
import axios from 'axios'
import type { App } from '@renderer/models/apps'
import { useActiveUserStore } from '@renderer/stores/user'

import AppTable from '@renderer/components/myui/apps/app-table'


export const Route = createFileRoute('/apps/')({
  component: RouteComponent,
})


function RouteComponent() {
  const [apps, setApps] = useState<App[]>([])
  const user = useActiveUserStore((s) => s)

  useEffect(() => {
    // Fetch apps from backend API
    async function fetchApps() {
      try {
        const response = await axios.get<App[]>(`${import.meta.env.VITE_URL}/apps?user_id=${user.id}`)
        console.log('Fetched apps:', response.data)
        setApps(response.data)
      } catch (error) {
        console.error('Error fetching apps:', error)
      }
    }

    fetchApps()
  }, [apps])

  console.log('Apps:', apps)
  return (
    <div className='flex flex-col'>
      <h1 className='text-4xl font-bold'>Your Apps</h1>

      {/* Table to show apps */}
      <div className="flex flex-col my-12">
        <div className='flex justify-between my-2'>
          <div className="font-medium text-2xl mb-4">Installed Applications</div>
          <div>
            <button className="px-6 py-2 bg-neutral-100 text-neutral-900 hover:text-neutral-200 rounded-lg hover:bg-neutral-800 transition-colors font-medium">Add App</button>
          </div>
        </div>
        <AppTable apps={apps} />
      </div>
    </div>
  )
}
