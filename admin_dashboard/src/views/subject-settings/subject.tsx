'use client'
// MUI Imports
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Box,
  Grid,
  Divider,
  IconButton
} from '@mui/material'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'
import Link from 'next/link'

// Imports
import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'

type subjects = {
  subjectName: string
  id: string
  className: string
  classId: string
}

const SubjectPage = () => {
  const router = useRouter()
  const [subjectData, setsubjectData] = useState<subjects[]>([])

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const response: AxiosResponse<subjects[]> = await axios.get('http://localhost:3001/digital-textbook/subject')
        setsubjectData(response.data)
      } catch (err) {
        console.error('Error fetching textbook data:', err)
        toast.error('Error while fetching textbook!')
      }
    }

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
        await axios.delete(`http://localhost:3001/digital-textbook/subject/${selectedId}`)
        toast.success('Subject deleted successfully!')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      } catch (error) {
        toast.error('Error while deleting subject!')
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
            <Typography variant='h4'>Subject</Typography>
            <div className='flex items-center cursor-pointer gap-2' style={{ flexGrow: 1 }}>
              <IconButton className='text-textPrimary'>
                <i className='ri-search-line' />
              </IconButton>
              <div className='whitespace-nowrap select-none text-textDisabled'>Search</div>
            </div>
          </Box>
          <Link href='school/add' passHref>
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
                <th>Subject</th>
                <th>Class</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subjectData.map((row, index) => (
                <tr key={index}>
                  <td className='!plb-1'>
                    <Typography>{row.subjectName}</Typography>
                  </td>
                  <td className='!plb-1'>
                    <Typography>{row.className}</Typography>
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
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this subject? This action cannot be undone.
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

export default SubjectPage
