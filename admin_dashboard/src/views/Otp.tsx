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

// Imports
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const OtpPage = ({ mode }: { mode: Mode }) => {
  // Vars
  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  // Hooks
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  // My Code
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const handleVerifyOtp = async () => {
    if (!id) {
      toast.error('Missing ID parameter.')
      return
    }

    try {
      await axios.post(`http://localhost:3001/digital-textbook/admin/${id}/reset-password/${otp}`)
      toast.success('OTP verified successfully!')
      setTimeout(() => {
        router.push(`/reset-password?id=${id}`)
      }, 3000)
    } catch (error) {
      toast.error('Invalid OTP. Please try again.')
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
          <Typography variant='h4'>OTP Verification</Typography>
          <div className='flex flex-col gap-5'>
            <Typography className='mbs-1'>Enter your otp and verify</Typography>
            <Form noValidate autoComplete='off' className='flex flex-col gap-5'>
              <TextField autoFocus fullWidth label='OTP' value={otp} required onChange={e => setOtp(e.target.value)} />
              {/* <Button fullWidth variant='contained' type='submit'> */}
              <Button fullWidth variant='contained' onClick={handleVerifyOtp}>
                Confirm
              </Button>
              <Typography className='flex justify-center items-center' color='primary'>
                <Link href='/forgot-password' className='flex items-center'>
                  <DirectionalIcon ltrIconClass='ri-arrow-left-s-line' rtlIconClass='ri-arrow-right-s-line' />
                  <span>Back to Forgot</span>
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

export default OtpPage
