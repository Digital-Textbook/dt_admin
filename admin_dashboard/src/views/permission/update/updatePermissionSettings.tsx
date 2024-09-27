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

type permission = {
  permissionName: string
  description: string
}

const UpdatePermissionSettings = () => {
  const [permissionName, setPermissionName] = useState('')
  const [description, setDescription] = useState('')
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
          setDescription(response.data.description)
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

  console.log('Permission Data::', permissionData)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.patch(`http://localhost:3001/digital-textbook/permission/${id}`, {
        permissionName,
        description
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
        <Grid item xs={12} sx={{ marginBottom: 5 }}>
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
                <InputLabel htmlFor='description'>Description</InputLabel>
                <TextField
                  fullWidth
                  id='description'
                  name='description'
                  value={description}
                  required
                  onChange={e => setDescription(e.target.value)}
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
