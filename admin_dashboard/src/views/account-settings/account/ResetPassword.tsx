'use client'
// MUI Imports

import { Button, Card, CardContent, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, FormEvent } from 'react'
import Form from '@components/Form'
import { IconEye, IconEyeOff } from '@tabler/icons-react'

const ResetPassword = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [user, setUser] = useState<any>(null)

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
      await axios.post(`http://localhost:3001/digital-textbook/admin/${id}/reset-password-by-email/${newPassword}`)
      toast.success('Password updated successfully!')
      setTimeout(() => {
        router.push('/')
      }, 3000)
    } catch (error) {
      toast.error('Failed to update password. Please try again.')
      console.log('Forgot password email error: ', error)
    }
  }
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleCancel = async () => {
    window.location.reload()
  }

  return (
    <>
      <ToastContainer />
      <Card>
        <CardContent>
          <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Grid
              container
              spacing={5}
              mt={3}
              style={{ flexDirection: 'column', display: 'flex', alignItems: 'center' }}
            >
              <Typography variant='h4'>Change Password</Typography>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  width: {
                    xs: '100%',
                    sm: '75%',
                    md: '60%',
                    lg: '60%',
                    xl: '60%'
                  },
                  padding: {
                    xs: 2,
                    sm: 3,
                    md: 4
                  },
                  margin: '0 auto'
                }}
              >
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
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <IconEyeOff /> : <IconEye />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  width: {
                    xs: '100%',
                    sm: '75%',
                    md: '60%',
                    lg: '60%',
                    xl: '60%'
                  },
                  padding: {
                    xs: 2,
                    sm: 3,
                    md: 4
                  },
                  margin: '0 auto'
                }}
              >
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
                          {showConfirmPassword ? <IconEyeOff /> : <IconEye />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid item xs={12} className='flex gap-4 flex-wrap'>
                <Button variant='contained' onClick={handleResetPassword}>
                  Confirm
                </Button>
                <Button variant='contained' type='reset' color='error' onClick={handleCancel}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

export default ResetPassword
