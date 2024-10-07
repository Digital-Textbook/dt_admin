import { TextField, InputAdornment, MenuItem, InputLabel, Grid } from '@mui/material'
import { FC } from 'react'

interface CustomTextFieldProps {
  title: string
  label: string
  id: string
  name: string
  value: string
  required?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  icon?: string
  type?: string
  select?: boolean
  options?: { value: string; label: string }[]
}

const CustomTextField: FC<CustomTextFieldProps> = ({
  title,
  label,
  id,
  name,
  value,
  required = false,
  onChange,
  icon,
  select = false,
  options = []
}) => {
  return (
    <Grid item xs={12} sm={6}>
      <InputLabel htmlFor={id}>{title}</InputLabel>
      <TextField
        fullWidth
        id={id}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        InputProps={{
          startAdornment: icon ? (
            <InputAdornment position='start'>
              <i className={icon} />
            </InputAdornment>
          ) : null
        }}
      >
        {select &&
          options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
      </TextField>
    </Grid>
  )
}

export default CustomTextField

{
  /* <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='schoolName'>School</InputLabel>
                <TextField
                  fullWidth
                  id='schoolName'
                  name='schoolName'
                  value={schoolName}
                  required
                  onChange={e => setSchoolName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-graduation-cap-line' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid> */
}
