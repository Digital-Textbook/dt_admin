'use client'

import { useState } from 'react'
import { Button, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material'
import type { FormEvent } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import CustomTextField from '@/components/shared/Input-field/TextField'

const AddPermissionSettingd = () => {
  const [permissionName, setPermissionName] = useState('')
  const [action, setAction] = useState('')
  const [subject, setSubject] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:3001/digital-textbook/permission', {
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
              <CustomTextField
                title='Permission Name'
                label='Permission Name'
                id='permissionName'
                name='permissionName'
                value={permissionName}
                required
                onChange={e => setPermissionName(e.target.value)}
                icon='ri-edit-2-line'
              />

              <CustomTextField
                title='Action'
                label='Action'
                id='action'
                name='action'
                value={action}
                required
                onChange={e => setAction(e.target.value)}
                icon='ri-book-3-line'
              />

              <CustomTextField
                title='Subject'
                label='Subject'
                id='subject'
                name='subject'
                value={subject}
                required
                onChange={e => setSubject(e.target.value)}
                icon='ri-book-3-line'
              />
              <Typography
                ml={5}
                mt={5}
                sx={{
                  background: '#fff8e1',
                  padding: '20px',
                  color: '#FFB400',
                  borderRadius: '16px',
                  fontSize: '14px'
                }}
              >
                <strong>1. Permission Name:</strong> Specifies the action a role is authorized to perform, such as
                "Create User." It should be concise yet descriptive to ensure clarity in access control and prevent any
                misinterpretation.
                <br />
                <br />
                <strong>2. Action Field:</strong> Defines the specific operation that can be executed. Common actions
                align with CRUD operations: Create, Read, Update, and Delete.
                <br />
                <br />
                <strong>3. Subject Field:</strong> Represents the entity or resource on which the action is to be
                applied. This refers to the domain object being accessed or modified, ensuring precise control over
                permissible operations.
              </Typography>

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
