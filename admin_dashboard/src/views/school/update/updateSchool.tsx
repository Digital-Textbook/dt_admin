'use client'

import { useState, useEffect } from 'react'

import type { FormEvent } from 'react'
import axios, { AxiosResponse } from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField
} from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import UpdateMessage from '@/components/shared/message/updated-warning'

interface dzongkhags {
  id: string
  name: string
}

const UpdateSchool = () => {
  const [schoolName, setSchoolName] = useState('')
  const [dzongkhagId, setDzongkhagId] = useState('')
  const [dzongkhag, setDzongkhag] = useState('')
  const [dzongkhagData, setDzongkhagData] = useState<dzongkhags[]>([])
  const [schoolData, setSchoolData] = useState<dzongkhags[]>([])
  const router = useRouter()

  const searchParams = useSearchParams()
  const schoolId = searchParams.get('id')

  useEffect(() => {
    const fetchDzongkhagData = async () => {
      try {
        const response: AxiosResponse<dzongkhags[]> = await axios.get(
          'http://localhost:3001/digital-textbook/common/dzongkhag'
        )
        setDzongkhagData(response.data)
      } catch (error) {
        console.error('Error dzongkhag data from database!', error)
        toast.error('Error while fetching dzongkhag data from database!')
      }
    }

    fetchDzongkhagData()
  }, [])

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/digital-textbook/school/${schoolId}`)
        setSchoolData(response.data)
        if (response.data) {
          setSchoolName(response.data.name)
          setDzongkhag(response.data.dzongkhag)
          setDzongkhagId(response.data.DzongkhagId)
        }
      } catch (err) {
        console.error('Error fetching textbook data:', err)
        toast.error('Error while fetching textbook!')
      }
    }

    if (schoolId) {
      fetchSchoolData()
    }
  }, [schoolId])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.patch(`http://localhost:3001/digital-textbook/school/${schoolId}`, {
        dzongkhagId,
        schoolName
      })
      toast.success('School updated successfully!')
      setTimeout(() => {
        router.push('/school')
      }, 2000)
    } catch (error) {
      toast.error('Error while updating school. Please try again!')
      console.error('Error updating school:', error)
    }
  }

  return (
    <>
      <Card>
        <ToastContainer />
        <Grid item xs={12} sx={{ marginBottom: 5 }}>
          <CardHeader title='Update School' />
          <Divider />
        </Grid>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              <UpdateMessage message='school' />
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='schoolName'>School</InputLabel>
                <TextField
                  fullWidth
                  id='schoolName'
                  name='schoolName'
                  value={schoolName}
                  required
                  onChange={e => setSchoolName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-graduation-cap-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='dzongkhag'>Dzongkhag</InputLabel>
                <TextField
                  select
                  fullWidth
                  id='dzongkhag'
                  name='dzongkhag'
                  value={dzongkhag}
                  required
                  onChange={e => {
                    const selectedDzongkhag = dzongkhagData.find(dzo => dzo.name === e.target.value)
                    if (selectedDzongkhag) {
                      setDzongkhag(e.target.value)
                      setDzongkhagId(selectedDzongkhag.id)
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-map-pin-line' />
                      </InputAdornment>
                    )
                  }}
                >
                  {dzongkhagData.map(dzo => (
                    <MenuItem key={dzo.id} value={dzo.name}>
                      {dzo.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                <Button variant='contained' type='submit'>
                  Submit
                </Button>
                <Button variant='contained' onClick={() => router.push('/subject')} color='error'>
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

export default UpdateSchool
