// components/StatusField.tsx
'use client'

import React from 'react'
import { TextField, MenuItem, InputAdornment, InputLabel, Grid } from '@mui/material'

interface StatusFieldProps {
  userType: string
  setUserType: (userType: string) => void
}

const UserTypeField: React.FC<StatusFieldProps> = ({ userType, setUserType }) => {
  return (
    <Grid item xs={12} sm={6}>
      <InputLabel htmlFor='userType'>User Type</InputLabel>
      <TextField
        select
        fullWidth
        id='userType'
        name='userType'
        value={userType}
        required
        onChange={e => setUserType(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <i className='ri-edit-2-line' />
            </InputAdornment>
          )
        }}
      >
        <MenuItem value='BhutaneseCid'>BhutaneseCid</MenuItem>
        <MenuItem value='BhutanesePermit'>BhutanesePermit</MenuItem>
        <MenuItem value='Non_Bhutanese'>Non_Bhutanese</MenuItem>
      </TextField>
    </Grid>
  )
}

export default UserTypeField

// <Grid item xs={12} sm={6}>
// <InputLabel htmlFor='userType'>User Type</InputLabel>
// <TextField
//   select
//   fullWidth
//   id='userType'
//   name='userType'
//   value={userType}
//   required
//   onChange={e => setUserType(e.target.value)}
//   InputProps={{
//     startAdornment: (
//       <InputAdornment position='start'>
//         <i className='ri-edit-2-line' />
//       </InputAdornment>
//     )
//   }}
// >
//   <MenuItem value='BhutaneseCid'>BhutaneseCid</MenuItem>
//   <MenuItem value='BhutanesePermit'>BhutanesePermit</MenuItem>
//   <MenuItem value='Non_Bhutanese'>Non_Bhutanese</MenuItem>
// </TextField>
// </Grid>
