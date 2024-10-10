// components/StatusField.tsx
'use client'

import React from 'react'
import { TextField, MenuItem, InputAdornment, InputLabel, Grid } from '@mui/material'

interface StatusFieldProps {
  otpOption: string
  setOtpOption: (otpOption: string) => void
}

const OtpOptionSelectField: React.FC<StatusFieldProps> = ({ otpOption, setOtpOption }) => {
  return (
    <Grid item xs={12} sm={6}>
      <InputLabel htmlFor='otpOption'>Otp Option</InputLabel>
      <TextField
        select
        fullWidth
        id='otpOption'
        name='otpOption'
        value={otpOption}
        required
        onChange={e => setOtpOption(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <i className='ri-mail-add-fill' />
            </InputAdornment>
          )
        }}
      >
        <MenuItem value='email'>Email</MenuItem>
        <MenuItem value='phone'>Phone</MenuItem>
      </TextField>
    </Grid>
  )
}

export default OtpOptionSelectField

{
  /* <Grid item xs={12} sm={6}>
<InputLabel htmlFor='otpOption'>OTP Option</InputLabel>
<TextField
  select
  fullWidth
  id='otpOption'
  name='otpOption'
  value={otpOption}
  required
  onChange={e => setOtpOption(e.target.value)}
  InputProps={{
    startAdornment: (
      <InputAdornment position='start'>
        <i className='ri-mail-add-fill' />
      </InputAdornment>
    )
  }}
>
  <MenuItem value='email'>Email</MenuItem>
  <MenuItem value='phone'>Phone</MenuItem>
</TextField>
</Grid> */
}
