'use client'

import {
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography
} from '@mui/material'
import tableStyles from '@core/styles/table.module.css'

import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import WarningMessage from '@/components/shared/warnings-message'

type Admin = {
  id: string
  name: string
  email: string
  mobileNo: string
  status: string
  role: Role
}

type Permission = {
  id: string
  permissionName: string
  subject: string
  action: string
}

type Role = {
  id: string
  name: string
  description: string
  permission: Permission[]
}

const RoleSettingsPage = () => {
  const [adminData, setAdminData] = useState<Admin[]>([])
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const router = useRouter()

  const fetchAdminData = async () => {
    try {
      const response: AxiosResponse<Admin[]> = await axios.get('http://localhost:3001/digital-textbook/admin')
      setAdminData(response.data)
    } catch (err) {
      console.error('Error fetching admin data:', err)
      toast.error('Error while fetching admin!')
    }
  }

  useEffect(() => {
    fetchAdminData()
  }, [])

  const handleEdit = (id: string) => {
    router.push(`/admin/update?id=${id}`)
  }

  const handleDelete = (id: string) => {
    setSelectedId(id)
    setOpenDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    if (selectedId) {
      try {
        await axios.delete(`http://localhost:3001/digital-textbook/admin/${selectedId}`)
        toast.success('Admin and associated data deleted successfully!')
        await fetchAdminData()
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
      <Box mb={5}>
        <Typography fontSize={24} mt={5} fontWeight={'400'}>
          User List
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
            Find all of digital textbook's administrator accounts and their associated roles.
          </Typography>

          <Button variant='contained' color='success' onClick={() => router.push('/admin/add')}>
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
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Mobile No.</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {adminData.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center' }}>
                    <Typography>No data in database</Typography>
                  </td>
                </tr>
              ) : (
                adminData.map((row, index) => (
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

                    <td>
                      <Typography>{row.role.name}</Typography>
                    </td>

                    <td className='!pb-1'>
                      <Chip
                        className='capitalize'
                        sx={{
                          backgroundColor:
                            row.status === 'inactive' ? '#f44336' : row.status === 'active' ? '#56ca00' : '#cccccc',
                          color: 'white'
                        }}
                        label={row.status}
                      />
                    </td>

                    <td className='!plb-1'>
                      <Typography>{row.mobileNo}</Typography>
                    </td>
                    <td className='!pb-1'>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 3,
                          cursor: 'pointer'
                        }}
                      >
                        <i className='ri-edit-line' onClick={() => handleEdit(row.id)} />
                        <i className='ri-delete-bin-line' onClick={() => handleDelete(row.id)} />
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
          <WarningMessage message='admin' />
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
