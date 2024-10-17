'use client'

import { useState, useEffect } from 'react'
import { Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material'
import type { FormEvent } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter, useSearchParams } from 'next/navigation'
import UpdateMessage from '@/components/shared/message/updated-warning'
import CustomTextField from '@/components/shared/Input-field/TextField'

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
      await axios.patch(
        `http://localhost:3001/digital-textbook/permission/${id}`,
        {
          permissionName,
          action,
          subject
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('adminAccessToken')}`
          }
        }
      )
      toast.success('Permission updated successfully!')
      setTimeout(() => {
        router.push('/permission')
      }, 3000)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error

        if (response) {
          switch (response?.status) {
            case 403:
              toast.error('User unauthorized. User does not have permission to create a student!')
              break
            case 401:
              toast.error('User is not authorized. Please login again!')
              break
            case 400:
              toast.error('A request with invalid parameters. Please check your input parameters.')
              break
            default:
              toast.error('An unexpected error occurred. Please try again later.')
              break
          }
        }
      } else {
        toast.error('Error while updating permission. Please try again!')
        console.error('Error while updating permission:', error)
      }
    }
  }

  return (
    <>
      <Card>
        <ToastContainer />
        <Grid item xs={12} mb={5}>
          <CardHeader title='Update Permission' />
          <Divider />
        </Grid>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              <UpdateMessage message='permission' />
              <CustomTextField
                title='Permission Name'
                label='Permission Name'
                id='permissionName'
                name='permissionName'
                value={permissionName || ''}
                required
                onChange={e => setPermissionName(e.target.value)}
                icon='ri-edit-2-line'
              />

              <CustomTextField
                title='Action'
                label='Action'
                id='action'
                name='action'
                value={action || ''}
                required
                onChange={e => setAction(e.target.value)}
                icon='ri-book-3-line'
              />

              <CustomTextField
                title='Subject'
                label='Subject'
                id='subject'
                name='subject'
                value={subject || ''}
                required
                onChange={e => setSubject(e.target.value)}
                icon='ri-book-3-line'
              />

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

export default UpdatePermissionSettings
