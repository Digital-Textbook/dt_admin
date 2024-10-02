'use client'

import { useState, useEffect, use } from 'react'
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

type role = {
  id: string
  name: string
  description: string
}

const AddAdmin = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [roleName, setRoleName] = useState('')
  const [roleId, setRoleId] = useState('')
  const [mobileNo, setMobileNo] = useState('')

  const router = useRouter()

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post(`http://localhost:3001/digital-textbook/admin/register`, {
        name,
        email,
        mobileNo,
        roleId
      })
      toast.success('Admin added successfully!')
      setTimeout(() => {
        router.push('/roles')
      }, 3000)
    } catch (error) {
      toast.error('Error while adding admin. Please try again!')
      console.error('Error while adding admin:', error)
    }
  }
  return (
    <>
      <Card>
        <ToastContainer />
        <Grid item xs={12} sx={{ marginBottom: 5 }}>
          <CardHeader title='Add Admin' />
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
                        <i className='ri-mail-send-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='roleName'>Role</InputLabel>
                <TextField
                  select
                  fullWidth
                  id='roleName'
                  name='roleName'
                  value={roleName}
                  required
                  onChange={e => {
                    const selectedRole = roleData.find(rls => rls.name === e.target.value)
                    if (selectedRole) {
                      setRoleName(e.target.value)
                      setRoleId(selectedRole.id)
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-shield-keyhole-line' />
                      </InputAdornment>
                    )
                  }}
                >
                  {roleData.map(role => (
                    <MenuItem key={role.id} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
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
                        <i className='ri-phone-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                <Button variant='contained' type='submit'>
                  Submit
                </Button>
                <Button variant='contained' color='error' onClick={() => router.push('/roles')}>
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

export default AddAdmin
