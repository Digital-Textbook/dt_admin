'use client'

import { useState } from 'react'

import { Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material'
import type { FormEvent } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import CustomTextField from '@/components/shared/Input-field/TextField'
import UserTypeField from '@/components/shared/user-type/UserTypeField'
import OtpOptionSelectField from '@/components/shared/otp/OtpSelectField'

const AddUser = () => {
  const [name, setName] = useState('')
  const [cidNo, setCidNo] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [userType, setUserType] = useState('')
  const [email, setEmail] = useState('')
  const [otpOption, setOtpOption] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:3001/digital-textbook/user/register', {
        name,
        cidNo,
        mobileNo,
        userType,
        email,
        otpOption
      })
      toast.success('User created successfully!')
      setTimeout(() => {
        router.push('/user')
      }, 3000)
    } catch (error) {
      toast.error('Error while creating user. Please try again!')
      console.error('Error creating user:', error)
    }
  }

  const handleCancel = () => {
    router.push(`/user`)
  }

  return (
    <>
      <Card>
        <ToastContainer />
        <Grid item xs={12} sx={{ marginBottom: 5 }}>
          <CardHeader title='Add User' />
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
                title='CID No.'
                label='CID No.'
                id='cidNo'
                name='cidNo'
                value={cidNo}
                required
                onChange={e => setCidNo(e.target.value)}
                icon='ri-contacts-book-2-line'
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

              <UserTypeField userType={userType} setUserType={setUserType} />

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

              <OtpOptionSelectField otpOption={otpOption} setOtpOption={setOtpOption} />

              <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                <Button variant='contained' type='submit' color='success'>
                  Submit
                </Button>
                <Button variant='contained' color='error' onClick={handleCancel}>
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

export default AddUser
