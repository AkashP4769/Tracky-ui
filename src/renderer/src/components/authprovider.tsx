import React, { useEffect } from 'react'
import axios from 'axios'
import { useActiveUserStore } from '@renderer/stores/user'

const Authprovider = ({ children }) => {
  // ✅ hook at top level
  const setUser = useActiveUserStore((s) => s.setUser)

  useEffect(() => {
    async function fetchActiveUser() {
      try {
        console.log('Fetching active user...')
        const response = await axios.get('http://localhost:5000/api/users/active')

        setUser(
          response.data.id,
          response.data.name,
          response.data.is_active
        )
      } catch (error) {
        console.error('Error fetching active user:', error)
      }
    }

    fetchActiveUser()
  }, [setUser])

  return <>{children}</>
}

export default Authprovider
