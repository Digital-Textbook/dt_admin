'use client'

import { useState } from 'react'
import { Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material'
import type { FormEvent } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import ClassTextField from '@/components/shared/class/ClassField'
import CustomTextField from '@/components/shared/Input-field/TextField'

const AddSubject = () => {
  const [subjectName, setSubjectName] = useState('')
  const [grade, setGrade] = useState('')
  const [classId, setClassId] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:3001/digital-textbook/subject', { classId, subjectName })
      toast.success('Textbook uploaded successfully!')
      setTimeout(() => {
        router.push('/subject')
      }, 3000)
    } catch (error) {
      toast.error('Error while uploading textbook. Please try again!')
      console.error('Error uploading textbook:', error)
    }
  }

  return (
    <>
      <Card>
        <ToastContainer />
        <Grid item xs={12} sx={{ marginBottom: 5 }}>
          <CardHeader title='Add Subject' />
          <Divider />
        </Grid>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              <ClassTextField
                value={grade}
                required
                onChange={(classId, className) => {
                  setGrade(className)
                  setClassId(classId)
                }}
              />

              <CustomTextField
                title='Subject'
                label='Subject'
                id='subjectName'
                name='subjectName'
                value={subjectName}
                required
                onChange={e => setSubjectName(e.target.value)}
                icon='ri-book-line'
              />

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

export default AddSubject
