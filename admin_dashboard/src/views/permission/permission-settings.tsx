'use client'

import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Typography
} from '@mui/material'
import Link from 'next/link'
import tableStyles from '@core/styles/table.module.css'

import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

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
    ADMIN: '#4caf50',
    'SUPER ADMIN': '#ef5350',
    USER: '#ffee58'
  }

  const getRoleColor = (role: string) => roleColors[role] || '#e1bee7'

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
        await axios.delete(`http://localhost:3001/digital-textbook/permission/${selectedId}`)
        toast.success('Permission deleted successfully!')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      } catch (error) {
        toast.error('Error while deleting permission!')
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
        >
          <Typography fontSize={16} mb={5}>
            Find all of digital textbook's permissions and their associate roles.
          </Typography>

          <Link href='permission/add' passHref>
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
                <th>Name</th>
                <th>Assigned To</th>
                <th>Description</th>
                <th>Creaded Date</th>
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
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 3
                        }}
                      >
                        {<i className='ri-edit-line' onClick={() => handleEditClick(row.id)} />}
                        {<i className='ri-delete-bin-line' onClick={() => handleDeleteClick(row.id)} />}
                      </Box>
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
          <DialogContentText>
            Are you sure you want to delete this permission? This action cannot be undone.
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
