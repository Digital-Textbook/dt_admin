import { TextField, InputAdornment, InputLabel, Grid } from '@mui/material'
import { FC } from 'react'

interface ViewFieldProps {
  title: string
  label: string
  id: string
  name: string
  value: string
  icon?: string
  readOnly?: boolean
}

const ViewField: FC<ViewFieldProps> = ({ title, id, name, value, icon, readOnly = false }) => {
  return (
    <Grid item xs={12} sm={12}>
      <InputLabel htmlFor={id}>{title}</InputLabel>
      <TextField
        fullWidth
        id={id}
        name={name}
        value={value}
        disabled={readOnly}
        InputProps={{
          startAdornment: icon ? (
            <InputAdornment position='start'>
              <i className={icon} />
            </InputAdornment>
          ) : null
        }}
      />
    </Grid>
  )
}

export default ViewField

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
