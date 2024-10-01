'use client'

import { useState, useEffect } from 'react'

import {
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
import type { FormEvent } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

const AddRoleSettings = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3001/digital-textbook/role', {
        name,
        description
      })
      toast.success('Role added successfully!')
      setTimeout(() => {
        router.push('/roles')
      }, 3000)
    } catch (error) {
      toast.error('Error while adding role. Please try again!')
      console.error('Error while adding role:', error)
    }
  }

  return (
    <>
      <Card>
        <ToastContainer />
        <Grid item xs={12} sx={{ marginBottom: 5 }}>
          <CardHeader title='Create Role' />
          <Divider />
        </Grid>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='name'>Role</InputLabel>
                <TextField
                  fullWidth
                  id='name'
                  name='name'
                  placeholder=''
                  value={name}
                  required
                  onChange={e => setName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-user-add-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='Description'>Description</InputLabel>
                <TextField
                  fullWidth
                  id='description'
                  name='description'
                  placeholder=''
                  value={description}
                  required
                  onChange={e => setDescription(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-edit-line' />
                      </InputAdornment>
                    )
                  }}
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

export default AddRoleSettings
