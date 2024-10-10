'use client'

import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Typography
} from '@mui/material'
import tableStyles from '@core/styles/table.module.css'

import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import WarningMessage from '@/components/shared/message/warnings-message'

type Role = {
  id: string
  name: string
  description: string
}

type permission = {
  id: string
  permissionName: string
  subject: string
  action: string
  createdAt: string
  roles: Role[]
}

const RoleSettingsPage = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [permissionData, setPermissionData] = useState<permission[]>([])
  const router = useRouter()

  useEffect(() => {
    const fetchPermissionData = async () => {
      try {
        const response: AxiosResponse<permission[]> = await axios.get(
          'http://localhost:3001/digital-textbook/permission/roles'
        )
        setPermissionData(response.data)
      } catch (err) {
        console.error('Error fetching admin data:', err)
        toast.error('Error while fetching admin!')
      }
    }

    fetchPermissionData()
  }, [])

  const handleEditClick = (id: string) => {
    router.push(`/permission/update?id=${id}`)
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

  const roleColors: Record<string, string> = {
    Admin: '#56CA00',
    'Super Admin': '#e74c3c'
  }

  const getRoleColor = (role: string) => roleColors[role] || '#ffee58'

  const handleDeleteClick = (id: string) => {
    setSelectedId(id)
    setOpenDeleteDialog(true)
  }

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false)
    setSelectedId(null)
  }

  const handleConfirmDelete = async () => {
    if (selectedId) {
      try {
        await axios.delete(`http://localhost:3001/digital-textbook/permission/${selectedId}`, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('adminAccessToken')}`
          }
        })
        toast.success('Permission deleted successfully!')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const { response } = error

          if (response) {
            switch (response?.status) {
              case 403:
                toast.error('User unauthorized. User does not have permission to delete permission!')
                break
              case 401:
                toast.error('User is not authorized. Please login again!')
                break
              case 400:
                toast.error('Bad request. Please check your Permission ID.')
                break
              default:
                toast.error('An unexpected error occurred. Please try again later.')
                break
            }
          }
        } else {
          toast.error('Error while deleting permission. Please try again!')
          console.error('Error while deleting permission:', error)
        }
      } finally {
        setOpenDeleteDialog(false)
        setSelectedId(null)
      }
    }
  }

  return (
    <Grid item xs={12} flexDirection='row'>
      <ToastContainer />
      <Box mb={5}>
        <Typography fontSize={24} mt={5} fontWeight={'200'}>
          Permission{' '}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
          mb={3}
        >
          <Typography fontSize={16} mb={5}>
            Find all of digital textbook's permissions and their associate roles.
          </Typography>

          <Button variant='contained' color='success' onClick={() => router.push('/permission/add')}>
            Add
          </Button>
        </Box>
        <Divider />
      </Box>

      <Card>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Assigned To</th>
                <th>Description</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {permissionData.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center' }}>
                    <Typography>No permission in database</Typography>
                  </td>
                </tr>
              ) : (
                permissionData.map((row, index) => (
                  <tr key={index}>
                    <td className='!plb-1'>
                      <div className='flex flex-col'>
                        <Typography>{row.permissionName}</Typography>
                      </div>
                    </td>

                    <td className='!plb-1'>
                      <div>
                        {row.roles.map(role => (
                          <Typography
                            key={role.id}
                            style={{
                              backgroundColor: getRoleColor(role.name),
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '24px',
                              display: 'inline-block',
                              marginRight: '8px',
                              fontSize: '12px'
                            }}
                          >
                            {role.name}
                          </Typography>
                        ))}
                      </div>
                    </td>

                    <td className='!plb-1'>
                      <Typography>
                        {row.action} {row.subject}
                      </Typography>
                    </td>

                    <td className='!plb-1'>
                      <Typography>{formatDate(row.createdAt)}</Typography>
                    </td>

                    <td className='!pb-1'>
                      <IconButton aria-label='copy' onClick={() => handleEditClick(row.id)}>
                        <i className='ri-edit-line' />
                      </IconButton>

                      <IconButton aria-label='copy' onClick={() => handleDeleteClick(row.id)}>
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
          <WarningMessage message='permission' />
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
    </Grid>
  )
}

export default RoleSettingsPage
