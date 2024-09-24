'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import { Card, CardContent, IconButton, InputAdornment, TextField, Typography, Button } from '@mui/material'
import type { FormEvent } from 'react'

// Type Imports
import type { Mode } from '@core/types'

// Component Imports
import Form from '@components/Form'
import Illustrations from '@components/Illustrations'
import Logo from '@components/layout/shared/Logo'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

// My Imports
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ResetPage = ({ mode }: { mode: Mode }) => {
  // Vars
  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  // Hooks
  const authBackground = useImageVariant(mode, lightImg, darkImg)

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

  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

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
        router.push('/login')
      }, 3000)
    } catch (error) {
      toast.error('Failed to update password. Please try again.')
      console.log('Forgot password email error: ', error)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <ToastContainer />
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href='/reset-password' className='flex justify-center items-center mbe-6'>
            <Logo />
          </Link>
          <Typography variant='h4'>Reset Password</Typography>
          <div className='flex flex-col gap-5'>
            <Typography className='mbs-1'>Enter your password and reset it</Typography>
            <Form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
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
              <Button fullWidth variant='contained' onClick={handleResetPassword}>
                Submit
              </Button>
            </Form>
          </div>
        </CardContent>
      </Card>
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  )
}

export default ResetPage
