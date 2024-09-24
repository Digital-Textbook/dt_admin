'use client'
// MUI Imports

import { Button, Card, CardContent, CardHeader, Checkbox, FormControlLabel } from '@mui/material'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect, FormEvent } from 'react'

const AccountDelete = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [user, setUser] = useState<any>(null)

  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked)
  }

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    const userData = storedUserData ? JSON.parse(storedUserData) : null
    setUser(userData)
  }, [])

  console.log('USER DATA:::', user)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!isChecked) {
      toast.error('Please confirm deactivation before proceeding!')
      return
    }

    try {
      const response = await axios.patch(`http://localhost:3001/digital-textbook/admin/${user.id}/deactive`)
      toast.success('Admin deactivated successfully!')
      setTimeout(() => {
        router.push('/roles')
      }, 3000)
    } catch (error) {
      toast.error('Error while deactivating admin. Please try again!')
      console.error('Error while deactivating admin:', error)
    }
  }
  console.log('User id::', id)
  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader title='Deactivate Account' />
          <CardContent className='flex flex-col items-start gap-6'>
            <FormControlLabel
              control={<Checkbox checked={isChecked} onChange={handleCheckboxChange} />}
              label='I confirm my account deactivation'
            />
            <Button variant='contained' color='error' type='submit' disabled={!isChecked}>
              Deactivate Account
            </Button>
          </CardContent>
        </Card>
      </form>
    </>
  )
}

export default AccountDelete
