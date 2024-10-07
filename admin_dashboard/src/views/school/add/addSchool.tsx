'use client'

import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material'
import { useRouter } from 'next/navigation'
import CustomTextField from '@/components/shared/Input-field/TextField'
import DzongkhagTextField from '@/components/shared/Dzongkhag/DzongkhagField'

const AddSchool = () => {
  const [schoolName, setSchoolName] = useState('')
  const [dzongkhagId, setDzongkhagId] = useState('')
  const [dzongkhag, setDzongkhag] = useState('')
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    const userData = storedUserData ? JSON.parse(storedUserData) : null
    setUser(userData)
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await axios.post(
        'http://localhost:3001/digital-textbook/school',
        { dzongkhagId, schoolName },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('adminAccessToken')}`
          }
        }
      )
      toast.success('School uploaded successfully!')
      setTimeout(() => {
        router.push('/school')
      }, 3000)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error

        if (response) {
          switch (response?.status) {
            case 403:
              toast.error('User unauthorized. User does not have permission to create school!')
              break
            case 401:
              toast.error('Session expired. Please login again!')

              break
            case 400:
              toast.error('Bad request. Please check your input.')
              break
            default:
              toast.error('An unexpected error occurred. Please try again later.')
              break
          }
        }
      } else {
        toast.error('An unexpected error occurred!')
      }
    }
  }

  return (
    <>
      <Card>
        <ToastContainer />
        <Grid item xs={12} sx={{ marginBottom: 5 }}>
          <CardHeader title='Add School' />
          <Divider />
        </Grid>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              <CustomTextField
                title='School'
                label='School'
                id='schoolName'
                name='schoolName'
                value={schoolName}
                required
                onChange={e => setSchoolName(e.target.value)}
                icon='ri-graduation-cap-line'
              />

              <DzongkhagTextField
                value={dzongkhag}
                required
                onChange={(dzongkhagId, dzongkhagName) => {
                  setDzongkhag(dzongkhagName)
                  setDzongkhagId(dzongkhagId)
                }}
              />

              <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                <Button variant='contained' type='submit' color='success'>
                  Submit
                </Button>
                <Button variant='contained' color='error' onClick={() => router.push('/school')}>
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

export default AddSchool
