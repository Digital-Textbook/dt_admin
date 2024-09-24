'use client'

// React Imports
import React, { useState } from 'react'
import type { FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'

// MUI Imports
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Type Imports
import type { Mode } from '@core/types'
import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'
import themeConfig from '@configs/themeConfig'
import { useImageVariant } from '@core/hooks/useImageVariant'

const Login = ({ mode }: { mode: Mode }) => {
  // States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const router = useRouter()

  // Vars
  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  // Hooks
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:3001/digital-textbook/auth/admin/login', { email, password })
      if (response.status === 201 && response.data.adminAccessToken) {
        toast.success('Login successful!')
        setTimeout(() => {
          router.push('/')
        }, 3000)
        localStorage.setItem('adminAccessToken', response.data.adminAccessToken)
        localStorage.setItem('userData', JSON.stringify(response.data.existingAdmin))
        const storedUserData = localStorage.getItem('userData')
        const userData = storedUserData ? JSON.parse(storedUserData) : null
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error

        if (response) {
          switch (response?.status) {
            case 409:
              toast.error('User already logged in on another device. Please try again!')
              break
            case 401:
              toast.error('Unauthorized admin. Please verify your account! OR reset your password!')
              break
            case 400:
              toast.error('Bad request. Please check your input.')
              break
            default:
              toast.error('An error occurred. Please try again later.')
              break
          }
        }
      } else {
        toast.error('An unexpected error occurred!')
      }

      console.error('Error: ', error)
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
          <div className='flex flex-col gap-5'>
            <div>
              <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}!`}</Typography>
            </div>
            <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
              <TextField autoFocus fullWidth label='Email' value={email} onChange={e => setEmail(e.target.value)} />
              <TextField
                fullWidth
                label='Password'
                id='outlined-adornment-password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                type={isPasswordShown ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                <FormControlLabel control={<Checkbox />} sx={{ visibility: 'hidden' }} label='Remember me' />
                <Typography className='text-end' color='primary' component={Link} href='/forgot-password'>
                  Forgot password?
                </Typography>
              </div>
              <Button fullWidth variant='contained' type='submit'>
                Log In
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  )
}

export default Login
