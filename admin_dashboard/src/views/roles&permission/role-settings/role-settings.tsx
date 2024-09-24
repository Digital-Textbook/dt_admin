'use client'

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography
} from '@mui/material'
import Link from 'next/link'
import tableStyles from '@core/styles/table.module.css'

import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type admin = {
  id: string
  name: string
  email: string
  roles: string
  status: string
  mobile_no: string
}

const RoleSettingsPage = () => {
  const [adminData, setAdminData] = useState<admin[]>([])

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    const fetchadminData = async () => {
      try {
        const response: AxiosResponse<admin[]> = await axios.get('http://localhost:3001/digital-textbook/admin')
        setAdminData(response.data)
      } catch (err) {
        console.error('Error fetching admin data:', err)
        toast.error('Error while fetching admin!')
      }
    }

    fetchadminData()
  }, [])

  const handleEdit = (id: string) => {
    router.push(`/roles/update?id=${id}`)
  }

  const handleDeleteClick = (id: string) => {
    setSelectedId(id)
    setOpenDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    if (selectedId) {
      try {
        await axios.delete(`http://localhost:3001/digital-textbook/admin/${selectedId}`)
        toast.success('Admin and associated data deleted successfully!')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      } catch (error) {
        toast.error('Error while deleting admin!')
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
    <Grid item xs={12} flexDirection='row'>
      <ToastContainer />
      <Typography fontSize={24} mt={5} fontWeight={'400'}>
        Role List
      </Typography>
      <Typography>
        A role provided access to predefined menus and features so that depending on assigned role an administrator can
        have access to what he need
      </Typography>

      <Grid container spacing={5} mt={3} mb={5}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={1}>
            <CardContent className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <Typography variant='body1' className='flex-grow'>
                  Total 4 users
                </Typography>
                <AvatarGroup max={4}>
                  <Avatar alt='Administrator' src='/images/avatars/1.png' />
                  <Avatar alt='Administrator' src='/images/avatars/2.png' />
                  <Avatar alt='Administrator' src='/images/avatars/3.png' />
                  <Avatar alt='Administrator' src='/images/avatars/4.png' />
                </AvatarGroup>
              </div>

              <div className='flex justify-between items-center'>
                <div className='flex flex-col items-start gap-1'>
                  <Typography variant='h5'>Administrator</Typography>

                  <Link href='/permission' style={{ color: '#765feb' }}>
                    Edit Role
                  </Link>
                </div>

                <IconButton aria-label='copy'>{<i className='ri-graduation-cap-line' />}</IconButton>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={1}>
            <CardContent className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <Typography variant='body1' className='flex-grow'>
                  Total 4 users
                </Typography>
                <AvatarGroup max={4}>
                  <Avatar alt='Administrator' src='/images/avatars/1.png' />
                  <Avatar alt='Administrator' src='/images/avatars/2.png' />
                  <Avatar alt='Administrator' src='/images/avatars/3.png' />
                  <Avatar alt='Administrator' src='/images/avatars/4.png' />
                </AvatarGroup>
              </div>

              <div className='flex justify-between items-center'>
                <div className='flex flex-col items-start gap-1'>
                  <Typography variant='h5'>Super Admin</Typography>

                  <Link href='/permission' style={{ color: '#765feb' }}>
                    Edit Role
                  </Link>
                </div>

                <IconButton aria-label='copy'>{<i className='ri-graduation-cap-line' />}</IconButton>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={1}>
            <CardContent className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <Typography variant='body1' className='flex-grow'>
                  Total 4 users
                </Typography>
                <AvatarGroup max={4}>
                  <Avatar alt='Administrator' src='/images/avatars/1.png' />
                  <Avatar alt='Administrator' src='/images/avatars/2.png' />
                  <Avatar alt='Administrator' src='/images/avatars/3.png' />
                  <Avatar alt='Administrator' src='/images/avatars/4.png' />
                </AvatarGroup>
              </div>

              <div className='flex justify-between items-center'>
                <div className='flex flex-col items-start gap-1'>
                  <Typography variant='h5'>User</Typography>

                  <Link href='/permission' style={{ color: '#765feb' }}>
                    Edit Role
                  </Link>
                </div>

                <IconButton aria-label='copy'>{<i className='ri-graduation-cap-line' />}</IconButton>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={1} className='cursor-pointer'>
            <CardContent className='flex flex-col gap-4' sx={{ padding: 0 }}>
              <Grid container className='bs-full'>
                <Grid item xs={5}>
                  <div className='flex items-end justify-center bs-full'>
                    <Image alt='add-role' src='/images/avatars/addRole.png' height={130} width={110} />
                  </div>
                </Grid>

                <Grid item xs={7}>
                  <CardContent className='mui-123q56s'>
                    <div className='flex flex-col items-end gap-4 text-right'>
                      <Button variant='contained' color='primary' size='small'>
                        Add Role
                      </Button>
                      <Typography variant='body1'>
                        Add new role, <br />
                        if it doesn't exist.
                      </Typography>
                    </div>
                  </CardContent>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* table title  */}
      <Box mb={5}>
        <Typography fontSize={24} mt={5} fontWeight={'200'}>
          Total users with their roles
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <Typography fontSize={16} mb={5}>
            Find all of digital textbook's administrator accounts and their associate roles.
          </Typography>

          <Link href='roles/add' passHref>
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
      </Box>

      <Card>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Mobile No.</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {adminData.map((row, index) => (
                <tr key={index}>
                  <td className='!plb-1'>
                    <div className='flex items-center gap-3'>
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #b388ff, #5e35b1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      >
                        {row.name.charAt(0).toUpperCase()}
                      </div>
                      <div className='flex flex-col'>
                        <Typography>{row.name}</Typography>
                      </div>
                    </div>
                  </td>

                  <td className='!plb-1'>
                    <Typography>{row.email}</Typography>
                  </td>

                  <td className='!pb-1'>
                    <div className='flex gap-2'>
                      {row.roles === 'SUPER_ADMIN' ? (
                        <i
                          className='ri-vip-crown-line'
                          style={{
                            color: '#f44336',
                            border: '1px solid red',
                            borderRadius: '50%'
                          }}
                        />
                      ) : (
                        <i
                          className='ri-pie-chart-line'
                          style={{
                            color: '#4caf50',
                            border: '1px solid green',
                            borderRadius: '50%'
                          }}
                        />
                      )}
                      <Typography>{row.roles}</Typography>
                    </div>
                  </td>

                  <td className='!pb-1'>
                    <Chip
                      className='capitalize'
                      variant='tonal'
                      sx={{
                        backgroundColor:
                          row.status === 'inactive' ? '#f44336' : row.status === 'active' ? 'green' : '##66bb6a',
                        color: 'white'
                      }}
                      label={row.status}
                      size='small'
                    />
                  </td>

                  <td className='!plb-1'>
                    <Typography>{row.mobile_no}</Typography>
                  </td>
                  <td className='!pb-1'>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 3
                      }}
                    >
                      {<i className='ri-delete-bin-7-line' onClick={() => handleDeleteClick(row.id)} />}
                      {<i className='ri-edit-line' onClick={() => handleEdit(row.id)} />}
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
    </Grid>
  )
}

export default RoleSettingsPage
