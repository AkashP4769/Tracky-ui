import { createFileRoute } from '@tanstack/react-router'
// import usestate from 'react-usestateref'
import { useState, useEffect } from 'react'
// import app from models
import axios from 'axios'
import type { App } from '@renderer/models/app'
import { useActiveUserStore } from '@renderer/stores/user'

import AppTable from '@renderer/components/myui/apps/app-table'
import AppEditor from '@renderer/components/myui/apps/app-editor'
import Btn from '@renderer/components/myui/btn'
import AppService from '@renderer/services/app-service'
import { is } from 'date-fns/locale'


export const Route = createFileRoute('/apps/')({
  component: RouteComponent,
})


function RouteComponent() {
  const user = useActiveUserStore((s) => s)
  const appService = new AppService()

  const [apps, setApps] = useState<App[]>([])
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editingApp, setEditingApp] = useState<App | null>(null)

  useEffect(() => {
    fetchApps()
  }, [])

  const fetchApps = async () => {
      try {
        const fetchedApps = await appService.fetchApps(user.id) 
        setApps(fetchedApps)
      } catch (error) {
        console.error('Error fetching apps:', error)
      }
    }

  const handleTrackingToggle = async (app: App) => {
    const updatedApp = { ...app, tracking_enabled: !app.tracking_enabled }
    const result = await appService.updateApp(updatedApp)
    if (result) {
      await fetchApps()
    }
  }

  const handleAppEdit = (app: App) => {
    setIsEditing(true)
    setEditingApp(app)
  }

  const handleAppCreate = () => {
    const newApp: App = {
      id: -1, // Temporary ID for new app
      user_id: user.id,
      name: '',
      process_name: '',
      added_on: new Date(),
      tracking_enabled: true,
    }
    setIsEditing(true)
    setEditingApp(newApp)
  }

  const handleEditCancel = () => {
    setIsEditing(false)
    setEditingApp(null)
  }

  const handleEditSave = async (updatedApp: App) => {
    if (!editingApp) return
    
    // Update app in backend
    const updated = updatedApp.id === -1 ? await appService.createApp(updatedApp) : await appService.updateApp(updatedApp)
    if (!updated) {
      console.error('Failed to update app')
      return
    }

    await fetchApps()
    setIsEditing(false)
    setEditingApp(null)
  }

  console.log('Apps:', apps)
  return (
    <div className='relative'>
      <div className={`absolute inset-0 z-10 flex flex-col ${isEditing ? 'blur-sm' : ''}`}>
        <h1 className='text-4xl font-bold'>Your Apps</h1>
      
        {/* Table to show apps */}
        <div className="flex flex-col my-12">
          <div className='flex justify-between my-2'>
            <div className="font-medium text-2xl mb-4">Installed Applications</div>
            <div>
              <Btn text="Add App" onClick={handleAppCreate} />
            </div>
          </div>
          <AppTable 
            apps={apps} 
            handleAppEdit={handleAppEdit}
            handleTrackingToggle={handleTrackingToggle} 
          />

        </div>
      </div>

      {/* Add edit popup */}
      {isEditing && editingApp !== null && (
        <AppEditor
          editingApp={editingApp}
          handleEditCancel={handleEditCancel}
          handleSave={handleEditSave}
        />
      )}
    </div>
  )
}
