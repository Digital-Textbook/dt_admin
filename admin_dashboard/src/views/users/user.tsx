'use client'
// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton
} from '@mui/material'
import Link from 'next/link'

import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

type UserData = {
  id: string
  name: string
  cidNo: string
  mobileNo: string
  userType: string
  email: string
}

const UserTable = () => {
  const [userData, setUserData] = useState<UserData[]>([])
  const router = useRouter()

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response: AxiosResponse<UserData[]> = await axios.get('http://localhost:3001/digital-textbook/user')
        setUserData(response.data)
      } catch (error) {
        console.log('Error fetching user data!:', error)
        toast.error('Error while fetching textbook!')
      }
    }
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
        await axios.delete(`http://localhost:3001/digital-textbook/user/${selectedId}`)
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
          <Link href='user/add' passHref>
            <Button
              variant='contained'
              sx={{
                background: 'green',
                color: 'white',
                '&:hover': {
                  background: '#4caf50'
                }
              }}
            >
              Add
            </Button>
          </Link>
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((row, index) => {
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
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1
                        }}
                      >
                        <Button
                          variant='contained'
                          sx={{
                            color: 'white',
                            background: 'green',
                            '&:hover': {
                              background: '#4caf50'
                            }
                          }}
                          onClick={() => handleEdit(row.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant='contained'
                          sx={{
                            color: 'white',
                            background: 'red',
                            '&:hover': {
                              background: '#ef5350'
                            }
                          }}
                          onClick={() => handleDeleteClick(row.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? User profiles, notes and bookmarks associated with user will also
            be deleted. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserTable
