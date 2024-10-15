'use client'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Card,
  Typography
} from '@mui/material'

import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import WarningMessage from '@/components/shared/message/warnings-message'

type UserData = {
  id: string
  name: string
  cidNo: string
  mobileNo: string
  userType: string
  status: string
  email: string
}

const UserTable = () => {
  const [userData, setUserData] = useState<UserData[]>([])
  const router = useRouter()

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const fetchUserData = async () => {
    try {
      const response: AxiosResponse<UserData[]> = await axios.get('http://localhost:3001/digital-textbook/user')
      setUserData(response.data)
    } catch (error) {
      console.log('Error fetching user data!:', error)
      toast.error('Error while fetching textbook!')
    }
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const handleEdit = (id: string) => {
    router.push(`/user/update?id=${id}`)
  }

  const handleDeleteClick = (id: string) => {
    setSelectedId(id)
    setOpenDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    if (selectedId) {
      try {
        await axios.delete(`http://localhost:3001/digital-textbook/user/${selectedId}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('adminAccessToken')}`
          }
        })
        setUserData(prevData => prevData.filter(item => item.id !== selectedId))
        toast.success('User and associated data deleted successfully!')
      } catch (error) {
        toast.error('Error while deleting user!')
      } finally {
        setOpenDeleteDialog(false)
        setSelectedId(null)
      }
    }
  }

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false)
    setSelectedId(null)
  }
  return (
    <>
      <ToastContainer />
      <Grid item xs={12} flexDirection='row' sx={{ marginBottom: 5 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexGrow: 1,
              gap: 2
            }}
          >
            <Typography variant='h4'>User</Typography>
            <div className='flex items-center cursor-pointer gap-2' style={{ flexGrow: 1 }}>
              <IconButton className='text-textPrimary'>
                <i className='ri-search-line' />
              </IconButton>
              <div className='whitespace-nowrap select-none text-textDisabled'>Search</div>
            </div>
          </Box>

          <Button variant='contained' color='success' onClick={() => router.push('user/add')}>
            Add
          </Button>
        </Box>
        <Divider />
      </Grid>
      <Card>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>CID No.</th>
                <th>Mobile No.</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center' }}>
                    <Typography>No user data in database</Typography>
                  </td>
                </tr>
              ) : (
                userData.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td className='!plb-1'>
                        <Typography>{row.name}</Typography>
                      </td>
                      <td className='!plb-1'>
                        <Typography>{row.cidNo}</Typography>
                      </td>
                      <td className='!plb-1'>
                        <Typography>{row.mobileNo}</Typography>
                      </td>
                      <td className='!plb-1'>
                        <Typography>{row.email}</Typography>
                      </td>
                      <td className='!plb-1'>
                        <Typography>{row.userType}</Typography>
                      </td>
                      <td className='!plb-1'>
                        <Typography>{row.status}</Typography>
                      </td>
                      <td className='!plb-1'>
                        <IconButton
                          aria-label='edit'
                          onClick={() => handleEdit(row.id)}
                          sx={{
                            backgroundColor: '#e8f5e9',
                            color: '#4caf50'
                          }}
                        >
                          <i className='ri-edit-line' />
                        </IconButton>

                        <IconButton
                          aria-label='delete'
                          onClick={() => handleDeleteClick(row.id)}
                          sx={{
                            backgroundColor: '#ffebee',
                            color: '#f44336'
                          }}
                        >
                          <i className='ri-delete-bin-line' />
                        </IconButton>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <WarningMessage message='user' />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color='success' variant='contained'>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color='error' variant='contained'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserTable
