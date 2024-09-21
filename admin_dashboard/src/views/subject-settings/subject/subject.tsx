'use client'
// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'
import { Box, Button, Divider, Grid, IconButton } from '@mui/material'
import Link from 'next/link'

// Imports
import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'

type TableBodyRowType = {
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

const SubjectPage = () => {
  const router = useRouter()
  const [textbookData, setTextbookData] = useState<TableBodyRowType[]>([])

  useEffect(() => {
    const fetchTextbookData = async () => {
      try {
        const response: AxiosResponse<TableBodyRowType[]> = await axios.get(
          'http://localhost:3001/Digital-textbook/textbook'
        )
        setTextbookData(response.data)
      } catch (err) {
        console.error('Error fetching textbook data:', err)
        toast.error('Error while fetching textbook!')
      }
    }

    fetchTextbookData()
  }, [])
  console.log('Textbook Data:: ', textbookData)
  return (
    <>
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
          <Link href='addTextbook' passHref>
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
              {textbookData.map((row, index) => (
                <tr key={index}>
                  <td className='!plb-1'>
                    <Typography>{row.subjectName}</Typography>
                  </td>
                  <td className='!plb-1'>
                    <Typography>{row.class}</Typography>
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
    </>
  )
}

export default SubjectPage
