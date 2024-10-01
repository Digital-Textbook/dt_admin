'use client'

import { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

import { Divider, InputLabel, MenuItem } from '@mui/material'
import type { FormEvent } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

const AddUser = () => {
  const [name, setName] = useState('')
  const [cidNo, setCidNo] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [userType, setUserType] = useState('')
  const [email, setEmail] = useState('')
  const [otpOption, setOtpOption] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:3001/digital-textbook/user/register', {
        name,
        cidNo,
        mobileNo,
        userType,
        email,
        otpOption
      })
      toast.success('User created successfully!')
      setTimeout(() => {
        router.push('/user')
      }, 3000)
    } catch (error) {
      toast.error('Error while creating user. Please try again!')
      console.error('Error creating user:', error)
    }
  }

  const handleCancel = () => {
    router.push(`/user`)
  }

  return (
    <>
      <Card>
        <ToastContainer />
        <Grid item xs={12} sx={{ marginBottom: 5 }}>
          <CardHeader title='Add User' />
          <Divider />
        </Grid>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='name'>Name</InputLabel>
                <TextField
                  fullWidth
                  id='name'
                  name='name'
                  value={name}
                  required
                  onChange={e => setName(e.target.value)}
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
                <InputLabel htmlFor='cidNo'>CID No.</InputLabel>
                <TextField
                  fullWidth
                  id='cidNo'
                  name='cidNo'
                  value={cidNo}
                  required
                  onChange={e => setCidNo(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-contacts-book-2-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='mobileNo'>Mobile No.</InputLabel>
                <TextField
                  fullWidth
                  id='mobileNo'
                  name='mobileNo'
                  value={mobileNo}
                  required
                  onChange={e => setMobileNo(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-phone-line' />
                      </InputAdornment>
                    )
                  }}
                ></TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='userType'>User Type</InputLabel>
                <TextField
                  select
                  fullWidth
                  id='userType'
                  name='userType'
                  value={userType}
                  required
                  onChange={e => setUserType(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-user-add-line' />
                      </InputAdornment>
                    )
                  }}
                >
                  <MenuItem value='BhutaneseCid'>BhutaneseCid</MenuItem>
                  <MenuItem value='BhutanesePermit'>BhutanesePermit</MenuItem>
                  <MenuItem value='Non-Bhutanese'>Non-Bhutanese</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='Email'>Email</InputLabel>
                <TextField
                  fullWidth
                  id='Email'
                  name='Email'
                  value={email}
                  required
                  onChange={e => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-mail-send-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='otpOption'>OTP Option</InputLabel>
                <TextField
                  select
                  fullWidth
                  id='otpOption'
                  name='otpOption'
                  value={otpOption}
                  required
                  onChange={e => setOtpOption(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-mail-add-fill' />
                      </InputAdornment>
                    )
                  }}
                >
                  <MenuItem value='email'>Email</MenuItem>
                  <MenuItem value='phone'>Phone</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                <Button variant='contained' type='submit'>
                  Submit
                </Button>
                <Button variant='contained' color='error' onClick={handleCancel}>
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

export default AddUser
