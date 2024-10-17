'use client'

import { useState, useEffect, FormEvent } from 'react'
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
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import CustomTextField from '@/components/shared/Input-field/TextField'

interface Gewog {
  id: string
  name: string
}

interface Dzongkhag {
  dzongkhagId: string
  name: string
  gewogs: Gewog[]
}

const AddSchool = () => {
  const [schoolName, setSchoolName] = useState('')
  const [dzongkhag, setDzongkhag] = useState('')
  const [dzongkhagId, setDzongkhagId] = useState('')
  const [gewog, setGewog] = useState('')
  const [gewogId, setGewogId] = useState('')
  const [dzongkhagData, setDzongkhagData] = useState<Dzongkhag[]>([])
  const [filteredGewogs, setFilteredGewogs] = useState<Gewog[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchDzongkhagGewogData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/digital-textbook/common/dzongkhag')
        setDzongkhagData(response.data)
      } catch (err) {
        console.error('Error fetching dzongkhag data:', err)
        toast.error('Error while fetching dzongkhag data!')
      }
    }

    fetchDzongkhagGewogData()
  }, [])

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
      await axios.post(
        'http://localhost:3001/digital-textbook/school',
        { dzongkhagId, gewogId, schoolName },
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
          switch (response.status) {
            case 403:
              toast.error('User unauthorized. User does not have permission to create a school!')
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
        toast.error('Error while adding school. Please try again!')
        console.error('Error adding school:', error)
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
                  id='gewog' // Updated the ID here for consistency
                  name='gewog'
                  value={gewog}
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
