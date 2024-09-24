'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// Type Imports
import type { Mode } from '@core/types'

// Component Imports
import Form from '@components/Form'
import DirectionalIcon from '@components/DirectionalIcon'
import Illustrations from '@components/Illustrations'
import Logo from '@components/layout/shared/Logo'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

const ForgotPassword = ({ mode }: { mode: Mode }) => {
  // Vars
  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  // Hooks
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/digital-textbook/admin/forgot-password/${email}`)

      const { admin } = response.data
      console.log('Admin::', admin)
      if (admin && admin.id) {
        toast.success('OTP sent to your email!')
        setTimeout(() => {
          router.push(`/otp?id=${admin.id}`)
        }, 3000)
      } else {
        toast.error('No admin ID returned in the response.')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to send OTP. Please check your email.')
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <ToastContainer />
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href='/' className='flex justify-center items-center mbe-6'>
            <Logo />
          </Link>
          <Typography variant='h4'>Forgot Password 🔒</Typography>
          <div className='flex flex-col gap-5'>
            <Typography className='mbs-1'>
              Enter your email and we&#39;ll send you OTP to reset your password
            </Typography>
            <Form noValidate autoComplete='off' className='flex flex-col gap-5'>
              <TextField
                autoFocus
                fullWidth
                label='Email'
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
              />
              {/* <Button fullWidth variant='contained' type='submit' href='/otp'> */}
              <Button fullWidth variant='contained' onClick={handleSendOtp}>
                Send OTP
              </Button>
              <Typography className='flex justify-center items-center' color='primary'>
                <Link href='/login' className='flex items-center'>
                  <DirectionalIcon ltrIconClass='ri-arrow-left-s-line' rtlIconClass='ri-arrow-right-s-line' />
                  <span>Back to Login</span>
                </Link>
              </Typography>
            </Form>
          </div>
        </CardContent>
      </Card>
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  )
}

export default ForgotPassword
