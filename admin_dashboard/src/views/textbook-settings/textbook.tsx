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
import Link from 'next/link'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'

// Imports
import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

type TableBodyRowType = {
  id: string
  author: string
  subjectName: string
  class: string
  chapter: string
  totalPages: string
  summary: string
  edition: string
  coverUrl?: string
  textbookUrl?: string
}

const TextbookPage = () => {
  const [textbookData, setTextbookData] = useState<TableBodyRowType[]>([])
  const router = useRouter()

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  useEffect(() => {
    const fetchTextbookData = async () => {
      try {
        const response: AxiosResponse<TableBodyRowType[]> = await axios.get(
          'http://localhost:3001/digital-textbook/textbook/all'
        )
        setTextbookData(response.data)
      } catch (err) {
        console.error('Error fetching textbook data:', err)
        toast.error('Error while fetching textbook!')
      }
    }

    fetchTextbookData()
  }, [])

  const handleEdit = (id: string) => {
    router.push(`/textbook/update?id=${id}`)
  }

  const handleDeleteClick = (id: string) => {
    setSelectedId(id)
    setOpenDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    if (selectedId) {
      try {
        await axios.delete(`http://localhost:3001/digital-textbook/textbook/${selectedId}`)
        setTextbookData(prevData => prevData.filter(item => item.id !== selectedId))
        setTimeout(() => {
          window.location.reload()
        }, 3000)
        toast.success('Textbook and associated bookmarks and notes deleted successfully!')
      } catch (error) {
        toast.error('Error while deleting textbook!')
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
            <Typography variant='h4'>Textbook</Typography>
            <div className='flex items-center cursor-pointer gap-2' style={{ flexGrow: 1 }}>
              <IconButton className='text-textPrimary'>
                <i className='ri-search-line' />
              </IconButton>
              <div className='whitespace-nowrap select-none text-textDisabled'>Search</div>
            </div>
          </Box>
          <Link href='textbook/add' passHref>
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
                <th>Author</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Chapter</th>
                <th>Pages</th>
                <th>Summary</th>
                <th>Edition</th>
                {/* <th>Cover</th> */}
                <th>Textbook</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {textbookData.map((row, index) => (
                <tr key={index}>
                  <td className='!plb-1'>
                    <Typography>{row.author}</Typography>
                  </td>
                  <td className='!plb-1'>
                    <Typography>{row.subjectName}</Typography>
                  </td>
                  <td className='!plb-1'>
                    <Typography sx={{ textAlign: 'center' }}>{row.class}</Typography>
                  </td>
                  <td className='!plb-1'>
                    <Typography sx={{ textAlign: 'center' }}>{row.chapter}</Typography>
                  </td>
                  <td className='!plb-1'>
                    <Typography sx={{ textAlign: 'center' }}> {row.totalPages || 'N/A'}</Typography>
                  </td>
                  <td className='!plb-1'>
                    <Typography>{row.summary}</Typography>
                  </td>
                  <td className='!plb-1'>
                    <Typography>{row.edition}</Typography>
                  </td>
                  {/* <td className='!plb-1'>
                    {row.coverUrl ? (
                      <img
                        src={row.coverUrl}
                        alt='Cover Image'
                        width='100'
                        height='80'
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      'No Cover'
                    )}
                  </td> */}
                  <td className='!plb-1'>
                    {row.textbookUrl ? (
                      <>
                        {row.textbookUrl.endsWith('.pdf') ? (
                          <Grid sx={{ flexDirection: 'row', display: 'flex' }}>
                            <i className='ri-file-pdf-2-fill' />
                            <Typography>PDF</Typography>
                          </Grid>
                        ) : row.textbookUrl.endsWith('.epub') ? (
                          <Grid sx={{ flexDirection: 'row', display: 'flex' }}>
                            <i className='ri-article-line' />
                            <Typography>EPUB</Typography>
                          </Grid>
                        ) : (
                          <iframe src={row.textbookUrl} width='100' height='80' style={{ border: 'none' }} />
                        )}
                      </>
                    ) : (
                      'No Textbook'
                    )}
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
            Are you sure you want to delete this textbook? Notes and bookmarks associated with textbook will also be
            deleted. This action cannot be undone.
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

export default TextbookPage
