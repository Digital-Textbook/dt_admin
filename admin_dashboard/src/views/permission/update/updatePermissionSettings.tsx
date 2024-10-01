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
import { useRouter, useSearchParams } from 'next/navigation'

type permission = {
  permissionName: string
  action: string
  subject: string
}

const UpdatePermissionSettings = () => {
  const [permissionName, setPermissionName] = useState('')
  const [action, setAction] = useState('')
  const [subject, setSubject] = useState('')
  const [permissionData, setPermissionData] = useState<permission[]>([])

  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const router = useRouter()

  useEffect(() => {
    const fetchPermissionData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/digital-textbook/permission/${id}`)
        setPermissionData(response.data)
        if (response.data) {
          setPermissionName(response.data.permissionName)
          setAction(response.data.action)
          setSubject(response.data.subject)
        }
      } catch (err) {
        console.error('Error fetching permission data:', err)
        toast.error('Error while fetching permission data!')
      }
    }

    if (id) {
      fetchPermissionData()
    }
  }, [id])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.patch(`http://localhost:3001/digital-textbook/permission/${id}`, {
        permissionName,
        action,
        subject
      })
      toast.success('Permission updated successfully!')
      setTimeout(() => {
        router.push('/permission')
      }, 3000)
    } catch (error) {
      toast.error('Error while updating permission. Please try again!')
      console.error('Error while updating permission:', error)
    }
  }

  return (
    <>
      <Card>
        <ToastContainer />
        <Grid item xs={12}>
          <CardHeader title='Update Permission' />
          <Divider />
        </Grid>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={12}>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#fff8e1',
                    padding: '20px',
                    color: '#FFB400',
                    borderRadius: '16px',
                    fontSize: '16px'
                  }}
                >
                  <i className='ri-error-warning-line' style={{ fontSize: '28px', marginRight: '10px' }} />
                  By editing the permission name, you might break the system permissions functionality. Please ensure
                  you're absolutely certain before proceeding.
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='permissionName'>Permission Name</InputLabel>
                <TextField
                  fullWidth
                  id='permissionName'
                  name='permissionName'
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
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='action'>Action</InputLabel>
                <TextField
                  fullWidth
                  id='action'
                  name='action'
                  value={action}
                  required
                  onChange={e => setAction(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-send-plane-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='subject'>Subject</InputLabel>
                <TextField
                  fullWidth
                  id='subject'
                  name='subject'
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

export default UpdatePermissionSettings
