import { createFileRoute } from '@tanstack/react-router'
import { useActiveUserStore } from '@renderer/stores/user'
import axios from 'axios'
import Btn from '@renderer/components/myui/btn'
import { useState, useEffect, useRef } from 'react'
import type { App } from '@renderer/models/app'
import { MessageClient } from '@renderer/services/ws-client'

export const Route = createFileRoute('/')({
  component: RouteComponent
})

// tracker status enum
enum TrackerStatus {
  Unknown = 'Unknown',
  Online = 'Online',
  Offline = 'Offline'
}

function RouteComponent() {
  const user = useActiveUserStore((s) => s)
  const clientRef = useRef<MessageClient | null>(null)

  const [trackerStatus, setTrackerStatus] = useState<string>(TrackerStatus.Unknown)
  const [onlineApps, setOnlineApps] = useState<App[]>([])

  const publishPing = () => {
    if (clientRef.current) {
      clientRef.current.publish('info', { timestamp: Date.now() })
      console.log('Published ping message')
    }
  }
    
  return (
    <div className='relative h-screen mx-6 my-6'>
      <div className={`absolute inset-0 z-10 flex flex-col`}>
        <h1 className='text-4xl font-bold'>Dashboard</h1>

        {/* Table to show apps */}
        <div className="flex flex-col my-12">
          <div className='flex justify-between my-2'>
            <div className="font-medium text-2xl mb-4">Online apps</div>
          </div>
        </div>
        <button onClick={publishPing}>Publish Ping</button>
      </div>
      
      
    </div>
  ) 
}
