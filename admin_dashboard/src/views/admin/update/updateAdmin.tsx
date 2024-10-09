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
import RoleSelectField from '@/components/shared/role/RoleSelectField'
import StatusSelectField from '@/components/shared/status/StatusSelectField'

type admin = {
  id: string
  name: string
  email: string
  roles: string
  status: string
  mobileNo: string
}

const UpdateAdmin = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [roleName, setRoleName] = useState('')
  const [roleId, setRoleId] = useState('')
  const [status, setStatus] = useState('')
  const [mobileNo, setMobileNo] = useState('')

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
          setRoleName(response.data.role.name)
          setRoleId(response.data.role.id)
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
      await axios.patch(
        `http://localhost:3001/digital-textbook/admin/${id}`,
        {
          name,
          email,
          roleId,
          status,
          mobileNo
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('adminAccessToken')}`
          }
        }
      )
      toast.success('Admin updated successfully!')
      setTimeout(() => {
        router.replace('/roles')
      }, 3000)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error

        if (response) {
          switch (response?.status) {
            case 403:
              toast.error('User unauthorized. User does not have permission to update admin!')
              break
            case 401:
              toast.error('User is not authorized. Please try again!')
              break
            case 400:
              toast.error('Bad request. Please check your input!')
              break
            default:
              toast.error('Error while adding admin. Please try again!')
              break
          }
        }
      } else {
        toast.error('An unexpected error occurred!')
        console.error('Error while updating admin:', error)
      }
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
              <UpdateMessage message='admin' />
              <CustomTextField
                title='Name'
                label='Name'
                id='name'
                name='name'
                value={name || ''}
                required
                onChange={e => setName(e.target.value)}
                icon='ri-user-3-line'
              />

              <CustomTextField
                title='Email'
                label='Email'
                id='email'
                name='email'
                value={email || ''}
                required
                onChange={e => setEmail(e.target.value)}
                icon='ri-mail-send-line'
              />

              <RoleSelectField
                value={roleName || ''}
                required
                onChange={(roleId, roleName) => {
                  setRoleName(roleName)
                  setRoleId(roleId)
                }}
              />

              <StatusSelectField status={status} setStatus={setStatus} />

              <CustomTextField
                title='Mobile No.'
                label='Mobile No.'
                id='mobileNo'
                name='mobileNo'
                value={mobileNo || ''}
                required
                onChange={e => setMobileNo(e.target.value)}
                icon='ri-phone-line'
              />

              <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                <Button variant='contained' type='submit' color='success'>
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

export default UpdateAdmin
