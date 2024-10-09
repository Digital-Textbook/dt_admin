'use client'

import { useState, useEffect, FormEvent } from 'react'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography
} from '@mui/material'
import axios, { AxiosResponse } from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter, useSearchParams } from 'next/navigation'
import UpdateMessage from '@/components/shared/message/updated-warning'
import CustomTextField from '@/components/shared/Input-field/TextField'

interface Role {
  id: string
  name: string
  description: string
  permissions: Permission[]
}

type Permission = {
  id: string
  permissionName: string
  action: string
  subject: string
}

const UpdateRoleSettings = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [role, setRole] = useState<Role[]>([])

  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const router = useRouter()

  const [permissionData, setPermissionData] = useState<Permission[]>([])
  const [roleData, setRoleData] = useState<Role | null>(null)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  useEffect(() => {
    const fetchPermissionData = async () => {
      try {
        const response: AxiosResponse<Permission[]> = await axios.get(
          'http://localhost:3001/digital-textbook/permission'
        )
        setPermissionData(response.data)
      } catch (err) {
        console.error('Error while fetching permission!', err)
        toast.error('Error while fetching permission!')
      }
    }

    fetchPermissionData()
  }, [])

  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const response: AxiosResponse<Role> = await axios.get(
          `http://localhost:3001/digital-textbook/role/${id}/permission`
        )
        setRoleData(response.data)
        setSelectedPermissions(response.data.permissions.map(perm => perm.id))
      } catch (err) {
        console.error('Error while fetching role data!', err)
        toast.error('Error while fetching role data!')
      }
    }

    if (id) {
      fetchRoleData()
    }
  }, [id])

  const handlePermissionChange = (permissionId: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permissionId) ? prev.filter(id => id !== permissionId) : [...prev, permissionId]
    )
  }

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/digital-textbook/role/${id}`)
        setRole(response.data)
        if (response.data) {
          setName(response.data.name)
          setDescription(response.data.description)
        }
      } catch (err) {
        console.error('Error fetching role data:', err)
        toast.error('Error while fetching role data!')
      }
    }

    if (id) {
      fetchRole()
    }
  }, [id])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await axios.patch(
        `http://localhost:3001/digital-textbook/role/${id}/permissions`,
        {
          permissionIds: selectedPermissions,
          roleData: {
            name,
            description
          }
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('adminAccessToken')}`
          }
        }
      )
      toast.success('Role updated successfully!')
      setTimeout(() => {
        router.push('/roles')
      }, 3000)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error

        if (response) {
          switch (response?.status) {
            case 403:
              toast.error('User unauthorized. User does not have permission to delete admin!')
              break
            case 401:
              toast.error('User is not authorized. Please try again!')
              break
            default:
              toast.error('Error while deleting admin. Please try again!')
              break
          }
        }
      } else {
        toast.error('Error while updating role. Please try again!')
        console.error('Error while updating role:', error)
      }
    }
  }

  return (
    <>
      <Card>
        <ToastContainer />
        <Grid item xs={12} mb={5}>
          <CardHeader title='Update Role' />
          <Divider />
        </Grid>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={6}>
              <UpdateMessage message='role' />
              <CustomTextField
                title='Role'
                label='Role'
                id='name'
                name='name'
                value={name || ''}
                required
                onChange={e => setName(e.target.value)}
                icon='ri-user-add-line'
              />

              <CustomTextField
                title='Description'
                label='Description'
                id='description'
                name='description'
                value={description || ''}
                required
                onChange={e => setDescription(e.target.value)}
                icon='ri-edit-line'
              />

              <Grid item xs={12}>
                <Typography variant='h5' mb={3}>
                  Role Permissions
                </Typography>
                {permissionData.map(permission => (
                  <FormControlLabel
                    key={permission.id}
                    control={
                      <Checkbox
                        checked={selectedPermissions.includes(permission.id)}
                        onChange={() => handlePermissionChange(permission.id)}
                      />
                    }
                    label={`${permission.permissionName}`}
                  />
                ))}
              </Grid>

              <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                <Button variant='contained' type='submit' color='success'>
                  Submit
                </Button>
                <Button variant='contained' onClick={() => router.push('/roles')} color='error'>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

export default UpdateRoleSettings
