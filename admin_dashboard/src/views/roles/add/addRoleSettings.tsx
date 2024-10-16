'use client'

import { useState } from 'react'
import { Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material'
import type { FormEvent } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import CustomTextField from '@/components/shared/Input-field/TextField'

const AddRoleSettings = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await axios.post(
        'http://localhost:3001/digital-textbook/role',
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('adminAccessToken')}`
          }
        }
      )
      toast.success('Role added successfully!')
      setTimeout(() => {
        router.push('/roles')
      }, 3000)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error

        if (response) {
          switch (response?.status) {
            case 403:
              toast.error('User unauthorized. User does not have permission to create role!')
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
        toast.error('Error while adding role. Please try again!')
        console.error('Error adding role:', error)
      }
    }
  }

  return (
    <>
      <Card>
        <ToastContainer />
        <Grid item xs={12} sx={{ marginBottom: 5 }}>
          <CardHeader title='Create Role' />
          <Divider />
        </Grid>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              <CustomTextField
                title='Role'
                label='Role'
                id='name'
                name='name'
                value={name}
                required
                onChange={e => setName(e.target.value)}
                icon='ri-user-add-line'
              />

              <CustomTextField
                title='Description'
                label='Description'
                id='description'
                name='description'
                value={description}
                required
                onChange={e => setDescription(e.target.value)}
                icon='ri-edit-line'
              />

              <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                <Button variant='contained' type='submit' color='success'>
                  Submit
                </Button>
                <Button variant='contained' type='reset' color='error' onClick={() => router.push('/roles')}>
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

export default AddRoleSettings
