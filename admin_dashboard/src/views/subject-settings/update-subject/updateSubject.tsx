'use client'

import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

import type { FormEvent } from 'react'
import axios, { AxiosResponse } from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Divider, InputLabel, MenuItem } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'

interface Classes {
  id: string
  class: string
}

const UpdateSubject = () => {
  const [subjectName, setSubjectName] = useState('')
  const [grade, setGrade] = useState('')
  const [classId, setClassId] = useState('')

  const [classData, setClassData] = useState<Classes[]>([])
  const [subjectData, setSubjectdata] = useState<Classes[]>([])

  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const router = useRouter()

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response: AxiosResponse<Classes[]> = await axios.get(
          'http://localhost:3001/Digital-textbook/subject/class'
        )
        setClassData(response.data)
      } catch (error) {
        console.error('Error classes from database!', error)
        toast.error('Error while fetching classes from database!')
      }
    }

    fetchClassData()
  }, [])

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/Digital-textbook/subject/${id}`)
        setSubjectdata(response.data)
        if (response.data) {
          setGrade(response.data.class)
          setSubjectName(response.data.subjectName)
        }
      } catch (err) {
        console.error('Error fetching textbook data:', err)
        toast.error('Error while fetching textbook!')
      }
    }

    if (id) {
      fetchSubjectData()
    }
  }, [id])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.patch(`http://localhost:3001/Digital-textbook/subject/${id}`, {
        classId,
        subjectName
      })
      toast.success('Subject updated successfully!')
      setTimeout(() => {
        router.push('/subject')
      }, 3000)
    } catch (error) {
      toast.error('Error while updating Subject. Please try again!')
      console.error('Error while updating Subject:', error)
    }
  }

  return (
    <>
      <Card>
        <ToastContainer />
        <Grid item xs={12} sx={{ marginBottom: 5 }}>
          <CardHeader title='Update Subject' />
          <Divider />
        </Grid>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='class'>Class</InputLabel>
                <TextField
                  select
                  fullWidth
                  id='class'
                  name='class'
                  value={grade}
                  required
                  onChange={e => {
                    const selectedClass = classData.find(cls => cls.class === e.target.value)
                    if (selectedClass) {
                      setGrade(e.target.value)
                      setClassId(selectedClass.id)
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-graduation-cap-line' />
                      </InputAdornment>
                    )
                  }}
                >
                  {classData.map(cls => (
                    <MenuItem key={cls.id} value={cls.class}>
                      {cls.class}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='chapter'>Subject</InputLabel>
                <TextField
                  fullWidth
                  id='subjectName'
                  name='subjectName'
                  value={subjectName}
                  required
                  onChange={e => setSubjectName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-book-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                <Button variant='contained' type='submit'>
                  Submit
                </Button>

                <Button variant='contained' onClick={() => router.push('/subject')}>
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

export default UpdateSubject
