'use client'
// MUI Imports

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, FormEvent } from 'react'
import Form from '@components/Form'

const ResetPassword = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(prev => !prev)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push('/')
  }

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.')
      return
    }

    if (!id) {
      toast.error('Missing ID parameter.')
      return
    }

    try {
      await axios.post(`http://localhost:3001/digital-textbook/admin/${id}/reset-password-byEmail/${newPassword}`)
      toast.success('Password updated successfully!')
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (error) {
      toast.error('Failed to update password. Please try again.')
      console.log('Forgot password email error: ', error)
    }
  }

  return (
    <>
      <ToastContainer />
      <Card>
        <CardHeader title='Change Password' />
        <CardContent>
          <form onSubmit={e => e.preventDefault()}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='New Password'
                  id='newPassword'
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  required
                  onChange={e => setNewPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          size='small'
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={e => e.preventDefault()}
                        >
                          <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label='Confirm Password'
                  id='confirmPassword'
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  required
                  onChange={e => setConfirmPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          size='small'
                          edge='end'
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={e => e.preventDefault()}
                        >
                          <i className={showConfirmPassword ? 'ri-eye-off-line' : 'ri-eye-line'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} className='flex gap-4 flex-wrap'>
                <Button variant='contained' type='submit'>
                  Save Changes
                </Button>
                <Button variant='contained' type='reset' color='error'>
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

export default ResetPassword
