// 'use client'
// import React, { createContext, useContext, useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// interface SessionContextProps {
//   user: any
//   setUser: (user: any) => void
// }

// const SessionContext = createContext<SessionContextProps | undefined>(undefined)

// export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<any>(null)
//   const router = useRouter()

//   useEffect(() => {
//     const checkSession = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/digital-textbook/auth/session')
//         setUser(response.data)
//       } catch (error) {
//         console.error('Session check failed:', error)
//         handleLogout()
//       }
//     }

//     // Check the session every 5 minutes (300000 milliseconds)
//     const intervalId = setInterval(checkSession, 300000)
//     // Initial check
//     checkSession()

//     return () => clearInterval(intervalId) // Clear interval on unmount
//   }, [])

//   const handleLogout = async () => {
//     try {
//       localStorage.removeItem('adminAccessToken')
//       localStorage.removeItem('userData')

//       // Logout API call
//       if (user?.id) {
//         await axios.post(`http://localhost:3001/digital-textbook/auth/${user.id}/admin-logout`)
//       }
//       setUser(null)
//       toast.success('You have been logged out due to session expiration.')
//       router.push('/login') // Redirect to login page
//     } catch (error) {
//       console.error('Error during logout:', error)
//       toast.error('Error occurred during logout.')
//     }
//   }

//   return <SessionContext.Provider value={{ user, setUser }}>{children}</SessionContext.Provider>
// }

// // Custom hook to use session context
// export const useSession = () => {
//   const context = useContext(SessionContext)
//   if (!context) {
//     throw new Error('useSession must be used within a SessionProvider')
//   }
//   return context
// }

'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

interface SessionContextProps {
  user: any
  setUser: (user: any) => void
  setAccessToken: (token: string) => void // For setting access token
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined)

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const [expirationTimeout, setExpirationTimeout] = useState<NodeJS.Timeout | null>(null)

  const setAccessToken = (token: string) => {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const expirationTime = payload.exp * 1000 // Convert expiration time to milliseconds

    // Set a timeout to log out when the token expires
    const timeoutId = setTimeout(() => {
      handleLogout()
    }, expirationTime - Date.now())

    // Clear previous timeout if it exists
    if (expirationTimeout) {
      clearTimeout(expirationTimeout)
    }
    setExpirationTimeout(timeoutId)

    localStorage.setItem('adminAccessToken', token)
  }

  const handleLogout = () => {
    // Clear local storage and user state
    localStorage.removeItem('adminAccessToken')
    localStorage.removeItem('userData')
    setUser(null)
    toast.success('You have been logged out due to session expiration.')
    router.push('/login') // Redirect to login page
  }

  useEffect(() => {
    // Cleanup function to clear timeout on unmount
    return () => {
      if (expirationTimeout) {
        clearTimeout(expirationTimeout)
      }
    }
  }, [expirationTimeout])

  return <SessionContext.Provider value={{ user, setUser, setAccessToken }}>{children}</SessionContext.Provider>
}

// Custom hook to use session context
export const useSession = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}
