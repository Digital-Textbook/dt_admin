'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import axios from 'axios'

interface SessionContextProps {
  user: any
  setUser: (user: any) => void
  setAccessToken: (token: string) => void
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined)

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const [expirationTimeout, setExpirationTimeout] = useState<NodeJS.Timeout | null>(null)

  // Function to set access token and handle expiration
  const setAccessToken = (token: string) => {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const expirationTime = payload.exp * 1000

    // Logout 1 minute (60000ms) before the actual expiration time
    const logoutTime = expirationTime - Date.now() - 60000

    const timeoutId = setTimeout(() => {
      handleLogout()
    }, logoutTime)

    if (expirationTimeout) {
      clearTimeout(expirationTimeout)
    }
    setExpirationTimeout(timeoutId)

    localStorage.setItem('adminAccessToken', token)
  }

  // Effect to load user data and check session expiration
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    const userData = storedUserData ? JSON.parse(storedUserData) : null
    setUser(userData)

    // Check if access token exists and is valid
    const token = localStorage.getItem('adminAccessToken')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const expirationTime = payload.exp * 1000

      if (Date.now() >= expirationTime) {
        // Token is expired, trigger logout
        handleLogout()
      } else {
        // Set timeout to automatically log out just before the session expires
        const logoutTime = expirationTime - Date.now() - 60000 // 1 minute before expiration
        const timeoutId = setTimeout(() => {
          handleLogout()
        }, logoutTime)

        setExpirationTimeout(timeoutId)
      }
    }
  }, [])

  useEffect(() => {
    return () => {
      if (expirationTimeout) {
        clearTimeout(expirationTimeout)
      }
    }
  }, [expirationTimeout])

  const handleLogout = async () => {
    try {
      console.log('User Data before logout::', user)

      localStorage.removeItem('adminAccessToken')
      localStorage.removeItem('userData')
      if (user?.id) {
        await axios.post(`http://localhost:3001/digital-textbook/auth/${user.id}/admin-logout`)
      }
      setUser(null)
      toast.success('Session expired. You have been logged out.')
      router.push('/login')
    } catch (error) {
      console.error('Error during logout:', error)
      toast.error('Error occurred during logout.')
    }
  }

  return <SessionContext.Provider value={{ user, setUser, setAccessToken }}>{children}</SessionContext.Provider>
}

export const useSession = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}
