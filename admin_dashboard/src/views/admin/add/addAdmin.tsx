'use client'

import { useState } from 'react'
import { Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material'
import type { FormEvent } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import CustomTextField from '@/components/shared/Input-field/TextField'
import RoleSelectField from '@/components/shared/role/RoleSelectField'

const AddAdmin = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [roleName, setRoleName] = useState('')
  const [roleId, setRoleId] = useState('')
  const [mobileNo, setMobileNo] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await axios.post(`http://localhost:3001/digital-textbook/admin/register`, {
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
              <CustomTextField
                title='Name'
                label='Name'
                id='name'
                name='name'
                value={name}
                required
                onChange={e => setName(e.target.value)}
                icon='ri-user-3-line'
              />

              <CustomTextField
                title='Email'
                label='Email'
                id='email'
                name='email'
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
                icon='ri-mail-send-line'
              />

              <RoleSelectField
                value={roleName}
                required
                onChange={(roleId, roleName) => {
                  setRoleName(roleName)
                  setRoleId(roleId)
                }}
              />

              <CustomTextField
                title='Mobile No.'
                label='Mobile No.'
                id='mobileNo'
                name='mobileNo'
                value={mobileNo}
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

export default AddAdmin
