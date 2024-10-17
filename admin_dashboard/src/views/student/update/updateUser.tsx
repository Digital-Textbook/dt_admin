'use client'

import { useState, useEffect, FormEvent } from 'react'
import { Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material'

import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter, useSearchParams } from 'next/navigation'
import UpdateMessage from '@/components/shared/message/updated-warning'
import CustomTextField from '@/components/shared/Input-field/TextField'
import UserTypeField from '@/components/shared/user-type/UserTypeField'

type UserData = {
  id: string
  name: string
  cidNo: string
  mobileNo: string
  userType: string
  email: string
}

const UpdateUser = () => {
  const [name, setName] = useState('')
  const [cidNo, setCidNo] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [userType, setUserType] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()

  const [user, setUser] = useState<UserData[]>([])
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/digital-textbook/user/${id}`)
        setUser(response.data)
        if (response.data) {
          setName(response.data.name)
          setCidNo(response.data.cidNo)
          setMobileNo(response.data.mobileNo)
          setUserType(response.data.userType)
          setEmail(response.data.email)
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
        `http://localhost:3001/digital-textbook/user/${id}`,
        {
          name,
          cidNo,
          mobileNo,
          userType,
          email
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('adminAccessToken')}`
          }
        }
      )
      toast.success('Student updated successfully!')
      setTimeout(() => {
        router.push('/student')
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
        toast.error('Error while updating student. Please try again!')
        console.error('Error updating student:', error)
      }
    }
  }

  return (
    <>
      <Card>
        <ToastContainer />
        <Grid item xs={12} sx={{ marginBottom: 5 }}>
          <CardHeader title='Update Student' />
          <Divider />
        </Grid>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              <UpdateMessage message='user' />
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
                title='CID NO.'
                label='CID NO.'
                id='cidNo'
                name='cidNo'
                value={cidNo}
                required
                onChange={e => setCidNo(e.target.value)}
                icon='ri-book-line'
              />

              <CustomTextField
                title='Mobile NO.'
                label='Mobile NO.'
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

              <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                <Button variant='contained' type='submit' color='success'>
                  Submit
                </Button>
                <Button variant='contained' color='error' onClick={() => router.push('/student')}>
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

export default UpdateUser
