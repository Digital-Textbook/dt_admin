'use client'

import { useState, useEffect, FormEvent } from 'react'

import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
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

type Subject = any

interface SubjectAndClass {
  id: string
  subjectName: string
  className: string
  classId: string
  subjects: Subject[]
}

const AddTextbook = () => {
  const [author, setAuthor] = useState('')

  const [subject, setSubject] = useState('')
  const [grade, setGrade] = useState('')
  const [subjectId, setSubjectId] = useState('')

  const [chapter, setChapter] = useState('')
  const [totalPages, setTotalPages] = useState('')
  const [edition, setEdition] = useState('')
  const [summary, setSummary] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const [classData, setClassData] = useState<SubjectAndClass[]>([])
  const [filteredSubjects, setFilteredSubjects] = useState<SubjectAndClass[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchTextbookData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/digital-textbook/common/subject')
        setClassData(response.data)
      } catch (err) {
        console.error('Error fetching textbook data:', err)
        toast.error('Error while fetching textbook!')
      }
    }

    fetchTextbookData()
  }, [])

  useEffect(() => {
    const selectedClass = classData.find(cls => cls.className === grade)
    if (selectedClass) {
      setFilteredSubjects(selectedClass.subjects)
    } else {
      setFilteredSubjects([])
    }
  }, [grade, classData])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('author', author)
    formData.append('subjectId', subjectId)
    formData.append('class', grade)
    formData.append('chapter', chapter)
    formData.append('totalPages', totalPages)
    formData.append('edition', edition)
    formData.append('summary', summary)

    if (image) {
      formData.append('textbookImage', image)
    }
    if (file) {
      formData.append('textbookFile', file, file.name)
    }

    try {
      await axios.post('http://localhost:3001/digital-textbook/textbook', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success('Textbook uploaded successfully!')
      setTimeout(() => {
        router.push('/textbook')
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
          <CardHeader title='Add Textbook' />
          <Divider />
        </Grid>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='author'>Author</InputLabel>
                <TextField
                  fullWidth
                  id='author'
                  name='author'
                  value={author}
                  required
                  onChange={e => setAuthor(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-user-3-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='chapter'>Chapter</InputLabel>
                <TextField
                  fullWidth
                  id='chapter'
                  name='chapter'
                  value={chapter}
                  required
                  onChange={e => setChapter(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-book-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='class'>Class</InputLabel>
                <TextField
                  select
                  fullWidth
                  id='class'
                  name='class'
                  value={grade}
                  required
                  onChange={e => setGrade(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-graduation-cap-line' />
                      </InputAdornment>
                    )
                  }}
                >
                  {classData.map((cls, key) => (
                    <MenuItem key={key} value={cls.className}>
                      {cls.className}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='subject'>Subject</InputLabel>
                <TextField
                  select
                  fullWidth
                  id='subject'
                  name='subject'
                  value={subject}
                  required
                  onChange={e => {
                    const selectedSubject = filteredSubjects.find(subj => subj.subjectName === e.target.value)
                    if (selectedSubject) {
                      setSubject(e.target.value)
                      setSubjectId(selectedSubject.id)
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
                  {filteredSubjects.length > 0 ? (
                    filteredSubjects.map(subj => (
                      <MenuItem key={subj.id} value={subj.subjectName}>
                        {subj.subjectName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No subjects available</MenuItem>
                  )}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='totalPages'>Pages</InputLabel>
                <TextField
                  fullWidth
                  id='totalPages'
                  name='totalPages'
                  value={totalPages}
                  required
                  onChange={e => setTotalPages(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-pages-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='edition'>Edition</InputLabel>
                <TextField
                  fullWidth
                  id='edition'
                  name='edition'
                  value={edition}
                  required
                  onChange={e => setEdition(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-contacts-book-3-fill' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <InputLabel htmlFor='summary'>Summary</InputLabel>
                <TextField
                  fullWidth
                  rows={12}
                  multiline
                  id='summary'
                  name='summary'
                  value={summary}
                  required
                  onChange={e => setSummary(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position='start'></InputAdornment>
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='coverImage'>Upload Cover Image</InputLabel>
                <TextField
                  fullWidth
                  type='file'
                  id='coverImage'
                  name='coverImage'
                  required
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ accept: 'image/*' }}
                  onChange={handleImageUpload}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='uploadFile'>Upload PDF/EPUB</InputLabel>
                <TextField
                  fullWidth
                  type='file'
                  id='uploadFile'
                  name='uploadFile'
                  required
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ accept: '.pdf,.epub' }}
                  onChange={handleFileUpload}
                />
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                <Button variant='contained' type='submit'>
                  Submit
                </Button>
                <Button variant='contained' type='reset'>
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

export default AddTextbook
