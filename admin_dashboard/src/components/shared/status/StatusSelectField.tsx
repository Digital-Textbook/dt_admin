// components/StatusField.tsx
'use client'

import React from 'react'
import { TextField, MenuItem, InputAdornment, InputLabel, Grid } from '@mui/material'

interface StatusFieldProps {
  status: string
  setStatus: (status: string) => void
}

const StatusSelectField: React.FC<StatusFieldProps> = ({ status, setStatus }) => {
  return (
    <Grid item xs={12} sm={6}>
      <InputLabel htmlFor='status'>Status</InputLabel>
      <TextField
        select
        fullWidth
        id='status'
        name='status'
        value={status}
        required
        onChange={e => setStatus(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <i className='ri-user-follow-line' />
            </InputAdornment>
          )
        }}
      >
        <MenuItem value='active'>ACTIVE</MenuItem>
        <MenuItem value='inactive'>INACTIVE</MenuItem>
      </TextField>
    </Grid>
  )
}

export default StatusSelectField

{
  /* <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='status'>Status</InputLabel>
                <TextField
                  select
                  fullWidth
                  id='status'
                  name='status'
                  value={status}
                  required
                  onChange={e => setStatus(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-user-follow-line' />
                      </InputAdornment>
                    )
                  }}
                >
                  <MenuItem value='active'>ACTIVE</MenuItem>
                  <MenuItem value='inactive'>INACTIVE</MenuItem>
                </TextField>
              </Grid> */
}
