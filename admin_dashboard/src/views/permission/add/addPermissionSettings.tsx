'use client'

import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

import { Divider, InputLabel, MenuItem, Typography } from '@mui/material'
import type { FormEvent } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

const AddPermissionSettingd = () => {
  const [permissionName, setPermissionName] = useState('')
  const [action, setAction] = useState('')
  const [subject, setSubject] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3001/digital-textbook/permission', {
        permissionName,
        action,
        subject
      })
      toast.success('Permission added successfully!')
      setTimeout(() => {
        router.push('/permission')
      }, 3000)
    } catch (error) {
      toast.error('Error while creating permission. Please try again!')
      console.error('Error while creating permission:', error)
    }
  }

  return (
    <>
      <Card>
        <ToastContainer />
        <Grid item xs={12}>
          <CardHeader title='Create Permission' />
          <Divider />
        </Grid>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='permissionName'>Permission Name</InputLabel>
                <TextField
                  fullWidth
                  id='permissionName'
                  name='permissionName'
                  placeholder=''
                  value={permissionName}
                  required
                  onChange={e => setPermissionName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-edit-2-line' />
                      </InputAdornment>
                    )
                  }}
                />
                <Typography
                  mt={3}
                  sx={{
                    background: '#fff8e1',
                    padding: '20px',
                    color: '#FFB400',
                    borderRadius: '16px',
                    fontSize: '14px'
                  }}
                >
                  Permission Name specifies the action a role is allowed to perform, such as "Create User". It should be
                  clear and descriptive to ensure proper access control and avoid confusion.
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='action'>Action</InputLabel>
                <TextField
                  fullWidth
                  id='action'
                  name='action'
                  placeholder=''
                  value={action}
                  required
                  onChange={e => setAction(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-book-3-line' />
                      </InputAdornment>
                    )
                  }}
                />
                <Typography
                  mt={3}
                  sx={{
                    background: '#fff8e1',
                    padding: '20px',
                    color: '#FFB400',
                    borderRadius: '16px',
                    fontSize: '14px'
                  }}
                >
                  The `action` field defines what kind of operation can be performed. Common actions are based on CRUD
                  (Create, Read, Update, Delete)
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='subject'>Subject</InputLabel>
                <TextField
                  fullWidth
                  id='subject'
                  name='subject'
                  placeholder=''
                  value={subject}
                  required
                  onChange={e => setSubject(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-book-3-line' />
                      </InputAdornment>
                    )
                  }}
                />
                <Typography
                  mt={3}
                  sx={{
                    background: '#fff8e1',
                    padding: '20px',
                    color: '#FFB400',
                    borderRadius: '16px',
                    fontSize: '14px'
                  }}
                >
                  The `subject` field defines the resource or entity on which the `action` can be performed. It
                  represents the domain or the object that is being accessed or manipulated.
                </Typography>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                <Button variant='contained' type='submit' color='success'>
                  Submit
                </Button>
                <Button variant='contained' type='reset' color='error' onClick={() => router.push('/permission')}>
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

export default AddPermissionSettingd
