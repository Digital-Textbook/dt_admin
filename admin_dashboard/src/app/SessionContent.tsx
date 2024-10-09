// 'use client'
// import React, { createContext, useContext, useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { toast } from 'react-toastify'
// import axios from 'axios'

// interface SessionContextProps {
//   user: any
//   setUser: (user: any) => void
//   setAccessToken: (token: string) => void
// }

// const SessionContext = createContext<SessionContextProps | undefined>(undefined)

// export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<any>(null)
//   const router = useRouter()
//   const [expirationTimeout, setExpirationTimeout] = useState<NodeJS.Timeout | null>(null)

//   const setAccessToken = (token: string) => {
//     const payload = JSON.parse(atob(token.split('.')[1]))
//     const expirationTime = payload.exp * 1000

//     const logoutTime = expirationTime - Date.now() - 60000

//     const timeoutId = setTimeout(() => {
//       handleLogout()
//     }, logoutTime)

//     if (expirationTimeout) {
//       clearTimeout(expirationTimeout)
//     }
//     setExpirationTimeout(timeoutId)

//     localStorage.setItem('adminAccessToken', token)
//   }

//   useEffect(() => {
//     const storedUserData = localStorage.getItem('userData')
//     const userData = storedUserData ? JSON.parse(storedUserData) : null
//     setUser(userData)

//     const token = localStorage.getItem('adminAccessToken')
//     if (token) {
//       const payload = JSON.parse(atob(token.split('.')[1]))
//       const expirationTime = payload.exp * 1000

//       console.log('Payload::', payload)
//       console.log('Expiration Time::', expirationTime)

//       if (Date.now() >= expirationTime) {
//         handleLogout()
//       } else {
//         const logoutTime = expirationTime - Date.now() - 60000 // 1 minute before expiration
//         const timeoutId = setTimeout(() => {
//           handleLogout()
//         }, logoutTime)

//         setExpirationTimeout(timeoutId)
//       }
//     }
//   }, [])

//   useEffect(() => {
//     return () => {
//       if (expirationTimeout) {
//         clearTimeout(expirationTimeout)
//       }
//     }
//   }, [expirationTimeout])

//   const handleLogout = async () => {
//     try {
//       const userData = localStorage.getItem('userData')
//       const user = userData ? JSON.parse(userData) : null

//       await axios.post(`http://localhost:3001/digital-textbook/auth/${user.id}/admin-logout`)

//       setUser(null)
//       localStorage.removeItem('adminAccessToken')
//       localStorage.removeItem('userData')

//       toast.success('Session expired. You have been logged out.')
//       setTimeout(() => {
//         router.push('/login')
//       }, 3000)
//     } catch (error) {
//       console.error('Error during logout:', error)
//       toast.error('Error occurred during logout.')
//     }
//   }

//   return <SessionContext.Provider value={{ user, setUser, setAccessToken }}>{children}</SessionContext.Provider>
// }

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
  const [isLoggedOut, setIsLoggedOut] = useState(false)

  const setAccessToken = (token: string) => {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const expirationTime = payload.exp * 1000

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

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    const userData = storedUserData ? JSON.parse(storedUserData) : null
    setUser(userData)

    const token = localStorage.getItem('adminAccessToken')
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const expirationTime = payload.exp * 1000

      if (Date.now() >= expirationTime) {
        handleLogout()
      } else {
        const logoutTime = expirationTime - Date.now() - 60000 // 1 minute before expiration

        // Clear existing timeout before setting a new one
        if (expirationTimeout) {
          clearTimeout(expirationTimeout)
        }

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
    if (isLoggedOut) return

    setIsLoggedOut(true)

    try {
      const userData = localStorage.getItem('userData')
      const user = userData ? JSON.parse(userData) : null

      await axios.post(`http://localhost:3001/digital-textbook/auth/${user.id}/admin-logout`)

      setUser(null)
      localStorage.removeItem('adminAccessToken')
      localStorage.removeItem('userData')

      toast.success('Session expired. You have been logged out.')
      setTimeout(() => {
        router.push('/login')
      }, 3000)
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
