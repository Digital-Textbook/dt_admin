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
import axios, { AxiosResponse } from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter, useSearchParams } from 'next/navigation'

type admin = {
  id: string
  name: string
  email: string
  roles: string
  status: string
  mobileNo: string
}

type role = {
  id: string
  role: string
}

const UpdateRoleSettings = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [roleId, setRoleId] = useState('')
  const [status, setStatus] = useState('')
  const [mobileNo, setMobileNo] = useState('')

  const router = useRouter()

  const [user, setUser] = useState<admin[]>([])
  const [roleData, setRoleData] = useState<role[]>([])
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const response: AxiosResponse<role[]> = await axios.get('http://localhost:3001/digital-textbook/role')
        setRoleData(response.data)
      } catch (err) {
        console.error('Error fetching role data:', err)
        toast.error('Error while fetching role data!')
      }
    }

    fetchRoleData()
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/digital-textbook/admin/${id}`)
        setUser(response.data)
        if (response.data) {
          setName(response.data.name)
          setEmail(response.data.email)
          setRole(response.data.role.role)
          setStatus(response.data.status)
          setMobileNo(response.data.mobileNo)
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
        roleId,
        status,
        mobileNo
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
          <CardHeader title='Update Admin' />
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
                <InputLabel htmlFor='role'>Role</InputLabel>
                <TextField
                  select
                  fullWidth
                  id='role'
                  name='role'
                  value={role}
                  required
                  onChange={e => {
                    const selectedRole = roleData.find(rls => rls.role === e.target.value)
                    if (selectedRole) {
                      setRole(e.target.value)
                      setRoleId(selectedRole.id)
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-book-line' />
                      </InputAdornment>
                    )
                  }}
                >
                  {roleData.map(role => (
                    <MenuItem key={role.id} value={role.role}>
                      {role.role}
                    </MenuItem>
                  ))}
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
                <InputLabel htmlFor='mobileNo'>Mobile No.</InputLabel>
                <TextField
                  fullWidth
                  id='mobileNo'
                  name='mobileNo'
                  placeholder=''
                  value={mobileNo}
                  required
                  onChange={e => setMobileNo(e.target.value)}
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
