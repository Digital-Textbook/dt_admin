'use client'

import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Grid,
  Divider,
  IconButton
} from '@mui/material'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'

import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'
import WarningMessage from '@/components/shared/message/warnings-message'

type subjects = {
  subjectName: string
  id: string
  className: string
  classId: string
  createdAt: string
}

const SubjectPage = () => {
  const router = useRouter()
  const [subjectData, setsubjectData] = useState<subjects[]>([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const fetchSubjectData = async () => {
    try {
      const response: AxiosResponse<subjects[]> = await axios.get('http://localhost:3001/digital-textbook/subject')
      setsubjectData(response.data)
    } catch (err) {
      console.error('Error fetching textbook data:', err)
      toast.error('Error while fetching textbook!')
    }
  }

  useEffect(() => {
    fetchSubjectData()
  }, [])

  const handleEdit = (id: string) => {
    router.push(`/subject/update?id=${id}`)
  }

  const handleDeleteClick = (id: string) => {
    setSelectedId(id)
    setOpenDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    if (selectedId) {
      try {
        await axios.delete(`http://localhost:3001/digital-textbook/subject/${selectedId}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('adminAccessToken')}`
          }
        })
        toast.success('Subject deleted successfully!')
        await fetchSubjectData()
        // setTimeout(() => {
        //   window.location.reload()
        // }, 3000)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const { response } = error

          if (response) {
            switch (response?.status) {
              case 403:
                toast.error('User unauthorized. User does not have permission to delete subject!')
                break
              case 401:
                toast.error('User is not authorized. Please login again!')
                break
              case 400:
                toast.error('Bad request. Please check Subject ID')
                break
              default:
                toast.error('An unexpected error occurred. Please try again later.')
                break
            }
          }
        } else {
          toast.error('Error while deleting subject!. Please try again!')
          console.error('Error uploading textbook:', error)
        }
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

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
    return new Date(dateString).toLocaleString('en-US', options)
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
            <Typography variant='h4'>Subject</Typography>
            <div className='flex items-center cursor-pointer gap-2' style={{ flexGrow: 1 }}>
              <IconButton className='text-textPrimary'>
                <i className='ri-search-line' />
              </IconButton>
              <div className='whitespace-nowrap select-none text-textDisabled'>Search</div>
            </div>
          </Box>

          <Button variant='contained' color='success' onClick={() => router.push('/subject/add')}>
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
                <th>Subject</th>
                <th>Class</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subjectData.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center' }}>
                    <Typography>No subject data in database</Typography>
                  </td>
                </tr>
              ) : (
                subjectData.map((row, index) => (
                  <tr key={index}>
                    <td className='!plb-1'>
                      <Typography>{row.subjectName}</Typography>
                    </td>
                    <td className='!plb-1'>
                      <Typography>{row.className}</Typography>
                    </td>
                    <td className='!plb-1'>
                      <Typography>{formatDate(row.createdAt)}</Typography>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <WarningMessage message='subject' />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleCancelDelete} color='success'>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleConfirmDelete} color='error'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SubjectPage
