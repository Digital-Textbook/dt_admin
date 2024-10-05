'use client'

// React Imports
import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

// MUI Imports
import { Button, Card, CardContent, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter, useSearchParams } from 'next/navigation'

type admin = {
  id: string
  name: string
  email: string
  mobileNo: string
  status: string
}

const AccountDetails = () => {
  const [user, setUser] = useState<admin[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [roles, setRoles] = useState('')
  const [status, setStatus] = useState('')
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/digital-textbook/admin/${id}`)
        setUser(response.data)
        if (response.data) {
          setName(response.data.name)
          setEmail(response.data.email)
          setMobileNo(response.data.mobileNo)
          setRoles(response.data.role.name)
          setStatus(response.data.status)
        }
      } catch (err) {
        console.error('Error fetching user data:', err)
        toast.error('Error while fetching user!')
      }
    }

    if (id) {
      fetchUserData()
    }
  }, [id])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.patch(`http://localhost:3001/digital-textbook/admin/${id}`, {
        name,
        email,
        mobileNo,
        roles,
        status
      })
      toast.success('Admin profile updated successfully!')
      setTimeout(() => {
        window.location.reload()
        // router.push('/')
      }, 3000)
    } catch (error) {
      toast.error('Error while updating admin profile. Please try again!')
      console.error('Error while updating admin profile:', error)
    }
  }

  return (
    <Card>
      <ToastContainer />
      <CardContent className='mbe-5'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <div className='flex items-center gap-3'>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #b388ff, #5e35b1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: 24
              }}
            >
              {name.charAt(0).toUpperCase()}
            </div>
            <div className='flex flex-col'>
              <Typography fontSize={24}>{name}</Typography>
            </div>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Name'
                value={name}
                placeholder='John'
                onChange={e => setName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-user-3-line' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Mobile No.'
                value={mobileNo}
                placeholder=''
                onChange={e => setMobileNo(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-phone-fill' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Email'
                value={email}
                placeholder='john.doe@gmail.com'
                onChange={e => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-mail-line' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Role'
                value={roles}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <i className='ri-admin-line' />
                    </InputAdornment>
                  )
                }}
                disabled
              />
            </Grid>

            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit'>
                Save
              </Button>
              {/* <Button variant='contained' type='reset' color='error'>
                Reset
              </Button> */}
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default AccountDetails
