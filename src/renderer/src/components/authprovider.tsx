import React, { useEffect } from 'react'
import axios from 'axios'
import { useActiveUserStore } from '@renderer/stores/user'
import UserService from '@renderer/services/user-service'

const Authprovider = ({ children }) => {
  // ✅ hook at top level
  const setUser = useActiveUserStore((s) => s.setUser)

  useEffect(() => {
    async function setActiveUser() {
      try {
        const userService = new UserService()
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

    setActiveUser()
  }, [setUser])

  return <>{children}</>
}

export default Authprovider
