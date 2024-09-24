'use client'

import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

import { Divider, InputLabel, MenuItem } from '@mui/material'
import type { FormEvent } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter, useSearchParams } from 'next/navigation'

type UserData = {
  id: string
  name: string
  cidNo: string
  mobileNo: string
  userType: string
  email: string
}

const UpdateUser = () => {
  const [name, setName] = useState('')
  const [cidNo, setCidNo] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [userType, setUserType] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()

  const [user, setUser] = useState<UserData[]>([])
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  /// Fetch data for update
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/digital-textbook/user/${id}`)
        setUser(response.data)
        if (response.data) {
          setName(response.data.name)
          setCidNo(response.data.cidNo)
          setMobileNo(response.data.mobileNo)
          setUserType(response.data.userType)
          setEmail(response.data.email)
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
      const response = await axios.patch(`http://localhost:3001/digital-textbook/user/${id}`, {
        name,
        cidNo,
        mobileNo,
        userType,
        email
      })
      toast.success('User updated successfully!')
      setTimeout(() => {
        router.push('/user')
      }, 3000)
    } catch (error) {
      toast.error('Error while uploading user. Please try again!')
      console.error('Error uploading user:', error)
    }
  }

  return (
    <>
      <Card>
        <ToastContainer />
        <Grid item xs={12} sx={{ marginBottom: 5 }}>
          <CardHeader title='Update User' />
          <Divider />
        </Grid>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='name'>Name</InputLabel>
                <TextField
                  fullWidth
                  id='name'
                  name='name'
                  placeholder='John Doe'
                  value={name}
                  required
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
                <InputLabel htmlFor='cidNo'>CID No.</InputLabel>
                <TextField
                  fullWidth
                  id='cidNo'
                  name='cidNo'
                  value={cidNo}
                  required
                  onChange={e => setCidNo(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-book-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='mobileNo'>Mobile No.</InputLabel>
                <TextField
                  fullWidth
                  id='mobileNo'
                  name='mobileNo'
                  value={mobileNo}
                  required
                  onChange={e => setMobileNo(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-graduation-cap-line' />
                      </InputAdornment>
                    )
                  }}
                ></TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='userType'>User Type</InputLabel>
                <TextField
                  fullWidth
                  id='userType'
                  name='userType'
                  value={userType}
                  required
                  onChange={e => setUserType(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-edit-2-line' />
                      </InputAdornment>
                    )
                  }}
                ></TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='email'>Email</InputLabel>
                <TextField
                  fullWidth
                  id='email'
                  name='email'
                  placeholder=''
                  value={email}
                  required
                  onChange={e => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-pages-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                <Button variant='contained' type='submit'>
                  Submit
                </Button>
                <Button variant='contained' type='reset'>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default UpdateUser
