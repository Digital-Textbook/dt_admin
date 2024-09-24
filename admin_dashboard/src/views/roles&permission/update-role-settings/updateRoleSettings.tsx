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

type admin = {
  id: string
  name: string
  email: string
  roles: string
  status: string
  mobile_no: string
}

const UpdateRoleSettings = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [roles, setRoles] = useState('')
  const [status, setStatus] = useState('')
  const [mobile_no, setMobile_no] = useState('')

  const router = useRouter()

  const [user, setUser] = useState<admin[]>([])
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/digital-textbook/admin/${id}`)
        setUser(response.data)
        if (response.data) {
          setName(response.data.name)
          setEmail(response.data.email)
          setRoles(response.data.roles)
          setStatus(response.data.status)
          setMobile_no(response.data.mobile_no)
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
        roles,
        status,
        mobile_no
      })
      toast.success('Admin updated successfully!')
      setTimeout(() => {
        router.push('/roles')
      }, 3000)
    } catch (error) {
      toast.error('Error while uploading admin. Please try again!')
      console.error('Error while updating admin:', error)
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
                <InputLabel htmlFor='email'>Email</InputLabel>
                <TextField
                  fullWidth
                  id='email'
                  name='email'
                  value={email}
                  required
                  onChange={e => setEmail(e.target.value)}
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
                <InputLabel htmlFor='roles'>Role</InputLabel>
                <TextField
                  select
                  fullWidth
                  id='roles'
                  name='roles'
                  value={roles}
                  required
                  onChange={e => setRoles(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-book-line' />
                      </InputAdornment>
                    )
                  }}
                >
                  <MenuItem value='ADMIN'>ADMIN</MenuItem>
                  <MenuItem value='SUPER_ADMIN'>SUPER ADMIN</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='status'>Status</InputLabel>
                <TextField
                  select
                  fullWidth
                  id='status'
                  name='status'
                  value={status}
                  required
                  onChange={e => setStatus(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-book-line' />
                      </InputAdornment>
                    )
                  }}
                >
                  <MenuItem value='active'>ACTIVE</MenuItem>
                  <MenuItem value='inactive'>INACTIVE</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='mobile_no'>Mobile No.</InputLabel>
                <TextField
                  fullWidth
                  id='mobile_no'
                  name='mobile_no'
                  placeholder=''
                  value={mobile_no}
                  required
                  onChange={e => setMobile_no(e.target.value)}
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

export default UpdateRoleSettings
