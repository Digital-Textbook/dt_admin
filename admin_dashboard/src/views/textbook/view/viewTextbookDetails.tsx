'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  InputAdornment,
  InputLabel,
  TextField
} from '@mui/material'

import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ViewField from '@/components/shared/Input-field/ViewField'
import ViewTextArea from '@/components/shared/Input-field/ViewTextArea'

type Subject = any

interface SubjectAndClass {
  id: string
  subjectName: string
  className: string
  classId: string
  subjects: Subject[]
}

const ViewTextbookDetails = () => {
  const [author, setAuthor] = useState('')
  const [subject, setSubject] = useState('')
  const [grade, setGrade] = useState('')
  const [chapter, setChapter] = useState('')
  const [totalPages, setTotalPages] = useState('')
  const [edition, setEdition] = useState('')
  const [summary, setSummary] = useState('')

  const [textbook, setTextbook] = useState<SubjectAndClass[]>([])

  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const router = useRouter()

  useEffect(() => {
    const fetchTextbookData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/Digital-textbook/textbook/${id}/textbook-info`)
        setTextbook(response.data)
        if (response.data) {
          setAuthor(response.data.author)
          setSubject(response.data.subjectName)
          setGrade(response.data.class)
          setChapter(response.data.chapter)
          setTotalPages(response.data.totalPages)
          setEdition(response.data.edition)
          setSummary(response.data.summary)
        }
      } catch (err) {
        console.error('Error fetching textbook data:', err)
        toast.error('Error while fetching textbook!')
      }
    }

    if (id) {
      fetchTextbookData()
    }
  }, [id])

  return (
    <>
      <Card>
        <ToastContainer />
        <Grid item xs={12} sx={{ marginBottom: 5 }}>
          <CardHeader title='Textbook Details' />
          <Divider />
        </Grid>
        <CardContent>
          <form>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Grid container spacing={6} sx={{ background: 'red' }}>
                <InputLabel>Textbook Cover</InputLabel>
                <Box></Box>
              </Grid>
              <Grid container spacing={5}>
                <ViewField
                  title='Author'
                  label='Author'
                  id='author'
                  name='author'
                  value={author || ''}
                  icon='ri-user-3-line'
                />

                <ViewField
                  title='Chapter'
                  label='Chapter'
                  id='chapter'
                  name='chapter'
                  value={chapter || ''}
                  icon='ri-book-line'
                />

                <ViewField
                  title='Class'
                  label='Class'
                  id='Class'
                  name='Class'
                  value={grade || ''}
                  icon='ri-book-line'
                />

                <ViewField
                  title='Subject'
                  label='Subject'
                  id='Subject'
                  name='Subject'
                  value={subject || ''}
                  icon='ri-book-line'
                />

                <ViewField
                  title='TotalPages'
                  label='TotalPages'
                  id='totalPages'
                  name='totalPages'
                  value={totalPages || ''}
                  icon='ri-pages-line'
                />

                <ViewField
                  title='Edition'
                  label='Edition'
                  id='edition'
                  name='edition'
                  value={edition || ''}
                  icon='ri-contacts-book-3-fill'
                />
              </Grid>
            </Box>

            <ViewTextArea title='Summary' label='Summary' id='summary' name='summary' value={summary || ''} />

            <Grid item xs={12} mt={5}>
              <Button variant='contained' color='success' onClick={() => router.push('/textbook')}>
                Go Back
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default ViewTextbookDetails
