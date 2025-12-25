import { createFileRoute } from '@tanstack/react-router'
// import usestate from 'react-usestateref'
import { useState, useEffect } from 'react'
// import app from models
import axios from 'axios'
import type { App } from '@renderer/models/apps'


export const Route = createFileRoute('/apps/')({
  component: RouteComponent,
})


function RouteComponent() {
  const [apps, setApps] = useState<App[]>([])

  useEffect(() => {
    // Fetch apps from backend API
    async function fetchApps() {
      try {
        const response = await axios.get<App[]>('http://localhost:5000/api/apps')
        setApps(response.data)
      } catch (error) {
        console.error('Error fetching apps:', error)
      }
    }

    fetchApps()
  }, [])

  console.log('Apps:', apps)
  return (
    <div className='flex flex-col'>
      <h1 className='text-4xl font-bold'>Your Apps</h1>

      {/* Table to show apps */}
    </div>
  )
}
