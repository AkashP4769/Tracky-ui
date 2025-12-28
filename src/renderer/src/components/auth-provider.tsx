import React, { useEffect } from 'react'
import axios from 'axios'
import { useActiveUserStore } from '@renderer/stores/user'
import UserService from '@renderer/services/user-service'
import { useAppsStore } from '@renderer/stores/apps'
import AppService from '@renderer/services/app-service'
import { App } from '@renderer/models/app'


const Authprovider = ({ children }) => {
  // ✅ hook at top level
  const setUser = useActiveUserStore((s) => s.setUser)
  const setApps = useAppsStore((s) => s.setApps)

  const userService = new UserService()
  const appService = new AppService()

  useEffect(() => {
    async function setActiveUser() {
      try {
        const user = await userService.getActiveUser()

        if (!user) {
          console.log('No active user found')
          return
        }

        setUser(
          user.id,
          user.name,
          user.is_active
        )
        
      } catch (error) {
        console.error('Error fetching active user:', error)
      }
    }

    async function fetchUserApps(userId: number) {
      try {
        const appslist = await appService.fetchApps(userId)
        const apps: {[key: string]: App} = {}

        appslist.forEach((app) => {
          apps[app.process_name] = app
        })

        console.log('Fetched apps for user:', apps)

        setApps(apps)
      } catch (error) {
        console.error('Error fetching user apps:', error)
      }
    }

    setActiveUser()
      .then(() => {
        const user = useActiveUserStore.getState().user
        if (user) {
          fetchUserApps(user.id)
        }
      })

  }, [setUser])

  return <>{children}</>
}

export default Authprovider
