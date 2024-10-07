import { TextField, InputAdornment, MenuItem, InputLabel, Grid } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

interface Role {
  id: string
  name: string
  description: string
}

interface RoleSelectProps {
  value: string
  onChange: (roleId: string, roleName: string) => void
  required?: boolean
}

const RoleSelectField: FC<RoleSelectProps> = ({ value, onChange, required = false }) => {
  const [roleData, setRoleData] = useState<Role[]>([])

  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const response: AxiosResponse<Role[]> = await axios.get('http://localhost:3001/digital-textbook/role')
        setRoleData(response.data)
      } catch (err) {
        console.error('Error fetching role data:', err)
        toast.error('Error while fetching role data!')
      }
    }

    fetchRoleData()
  }, [])

  return (
    <Grid item xs={12} sm={6}>
      <InputLabel htmlFor='roleName'>Role</InputLabel>
      <TextField
        select
        fullWidth
        id='roleName'
        name='roleName'
        value={value}
        required={required}
        onChange={e => {
          const selectedRole = roleData.find(rls => rls.name === e.target.value)
          if (selectedRole) {
            onChange(selectedRole.id, selectedRole.name)
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <i className='ri-shield-keyhole-line' />
            </InputAdornment>
          )
        }}
      >
        {roleData.map(role => (
          <MenuItem key={role.id} value={role.name}>
            {role.name}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  )
}

export default RoleSelectField

type role = {
  id: string
  name: string
  description: string
}
// const [roleData, setRoleData] = useState<role[]>([])

// useEffect(() => {
//     const fetchRoleData = async () => {
//       try {
//         const response: AxiosResponse<role[]> = await axios.get('http://localhost:3001/digital-textbook/role')
//         setRoleData(response.data)
//       } catch (err) {
//         console.error('Error fetching role data:', err)
//         toast.error('Error while fetching role data!')
//       }
//     }

//     fetchRoleData()
//   }, [])<Grid item xs={12} sm={6}>
//                 <InputLabel htmlFor='roleName'>Role</InputLabel>
//                 <TextField
//                   select
//                   fullWidth
//                   id='roleName'
//                   name='roleName'
//                   value={roleName}
//                   required
//                   onChange={e => {
//                     const selectedRole = roleData.find(rls => rls.name === e.target.value)
//                     if (selectedRole) {
//                       setRoleName(e.target.value)
//                       setRoleId(selectedRole.id)
//                     }
//                   }}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position='start'>
//                         <i className='ri-shield-keyhole-line' />
//                       </InputAdornment>
//                     )
//                   }}
//                 >
//                   {roleData.map(role => (
//                     <MenuItem key={role.id} value={role.name}>
//                       {role.name}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
