'use client'

import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography
} from '@mui/material'

import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import WarningMessage from '@/components/shared/warnings-message'

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
  const [roleData, setRoleData] = useState<Role[]>([])

  const router = useRouter()
  const [openDeleteRoleDialog, setOpenDeleteRoleDialog] = useState(false)
  const [roleId, setRoleId] = useState<string | null>(null)

  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const response: AxiosResponse<Role[]> = await axios.get('http://localhost:3001/digital-textbook/role')
        setRoleData(response.data)
      } catch (err) {
        console.error('Error fetching admin data:', err)
        toast.error('Error while fetching admin!')
      }
    }

    fetchRoleData()
  }, [])

  const handleEditClick = (id: string) => {
    router.push(`/roles/update?id=${id}`)
  }

  const handleDeleteClick = (id: string) => {
    setRoleId(id)
    setOpenDeleteRoleDialog(true)
  }

  const handleCancelRole = () => {
    setRoleId(null)
    setOpenDeleteRoleDialog(false)
  }

  const handleDeleteRole = async () => {
    if (roleId) {
      try {
        await axios.delete(`http://localhost:3001/digital-textbook/role/${roleId}`)
        toast.success('Role and associated data deleted successfully!')
        setTimeout(() => {
          window.location.reload()
        }, 3000)
      } catch (error) {
        toast.error('Error while deleting role!')
      } finally {
        setOpenDeleteRoleDialog(false)
        setRoleId(null)
      }
    }
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
        {roleData.length === 0 ? (
          <></>
        ) : (
          roleData.map(role => (
            <Grid item xs={12} sm={6} md={4} key={role.id}>
              <Card elevation={1}>
                <CardContent className='flex flex-col gap-4'>
                  <div className='flex justify-between items-center'>
                    <div className='flex flex-col items-start gap-1'>
                      <Typography variant='h5'>{role.name}</Typography>
                      <Typography style={{ color: 'rgb(46 38 61 / 70%)', fontSize: '12px' }}>Total User</Typography>
                    </div>
                    <div className='flex flex-row items-start gap-1'>
                      <IconButton aria-label='copy' onClick={() => handleEditClick(role.id)}>
                        <i className='ri-edit-line' />
                      </IconButton>
                      <IconButton aria-label='copy'>
                        <i className='ri-delete-bin-line' onClick={() => handleDeleteClick(role.id)} />
                      </IconButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={1}>
            <CardContent className='flex flex-col gap-4'>
              <div className='flex justify-between items-center'>
                <div className='flex flex-col items-start gap-1'>
                  <Typography variant='h5'>Add Role</Typography>
                  <Typography style={{ color: '#765feb', fontSize: '12px' }}>
                    Add new role, if it doesn't exist.
                  </Typography>
                </div>
                <IconButton aria-label='copy' href={`/roles/add`}>
                  <i className='ri-user-add-line' />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Delete Confirmation Dialog For Role */}
      <Dialog open={openDeleteRoleDialog} onClose={handleCancelRole}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <WarningMessage message='role' />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelRole} color='success' variant='contained'>
            Cancel
          </Button>
          <Button onClick={handleDeleteRole} color='error' variant='contained'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default RoleSettingsPage
