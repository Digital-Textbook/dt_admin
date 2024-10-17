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

interface Gewog {
  id: string
  name: string
}

interface Dzongkhag {
  dzongkhagId: string
  name: string
  gewogs: Gewog[]
}
const UpdateSchool = () => {
  const [schoolName, setSchoolName] = useState('')
  const [dzongkhag, setDzongkhag] = useState('')
  const [dzongkhagId, setDzongkhagId] = useState('')
  const [gewog, setGewog] = useState('')
  const [gewogId, setGewogId] = useState('')

  const [dzongkhagData, setDzongkhagData] = useState<Dzongkhag[]>([])
  const [schoolData, setSchoolData] = useState<Dzongkhag[]>([])
  const [filteredGewogs, setFilteredGewogs] = useState<Gewog[]>([])
  const router = useRouter()

  const searchParams = useSearchParams()
  const schoolId = searchParams.get('id')

  useEffect(() => {
    const fetchDzongkhagData = async () => {
      try {
        const response: AxiosResponse<Dzongkhag[]> = await axios.get(
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
          setGewog(response.data.gewog)
          setGewogId(response.data.gewogId)
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

  useEffect(() => {
    const selectedDzongkhag = dzongkhagData.find(dzo => dzo.name === dzongkhag)
    if (selectedDzongkhag) {
      setFilteredGewogs(selectedDzongkhag.gewogs)
      setDzongkhagId(selectedDzongkhag.dzongkhagId)
    } else {
      setFilteredGewogs([])
      setDzongkhagId('')
    }
  }, [dzongkhag, dzongkhagData])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.patch(
        `http://localhost:3001/digital-textbook/school/${schoolId}`,
        {
          dzongkhagId,
          gewogId,
          schoolName
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('adminAccessToken')}`
          }
        }
      )
      toast.success('School updated successfully!')
      setTimeout(() => {
        router.push('/school')
      }, 2000)
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
        toast.error('Error while updating school. Please try again!')
        console.error('Error updating school:', error)
      }
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
                  onChange={e => setDzongkhag(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-graduation-cap-line' />
                      </InputAdornment>
                    )
                  }}
                >
                  {dzongkhagData.map((dzo, key) => (
                    <MenuItem key={key} value={dzo.name}>
                      {dzo.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='gewog'>Gewog</InputLabel>
                <TextField
                  select
                  fullWidth
                  id='gewog'
                  name='gewog'
                  value={filteredGewogs.some(geo => geo.name === gewog) ? gewog : ''}
                  required
                  onChange={e => {
                    const selectedGewog = filteredGewogs.find(geo => geo.name === e.target.value)
                    if (selectedGewog) {
                      setGewog(e.target.value)
                      setGewogId(selectedGewog.id)
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-edit-2-line' />
                      </InputAdornment>
                    )
                  }}
                >
                  {filteredGewogs.length > 0 ? (
                    filteredGewogs.map(geo => (
                      <MenuItem key={geo.id} value={geo.name}>
                        {geo.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No gewogs available</MenuItem>
                  )}
                </TextField>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                <Button variant='contained' type='submit' color='success'>
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
