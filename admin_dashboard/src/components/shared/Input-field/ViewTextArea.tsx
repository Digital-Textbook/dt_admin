import { TextField, InputLabel, Grid } from '@mui/material'
import { FC } from 'react'

interface ViewTextAreaProps {
  title: string
  label: string
  id: string
  name: string
  value: string
  readOnly?: boolean
}

const ViewTextArea: FC<ViewTextAreaProps> = ({ title, id, name, value, readOnly = false }) => {
  return (
    <Grid item xs={12}>
      <InputLabel htmlFor={id}>{title}</InputLabel>
      <TextField fullWidth id={id} rows={12} multiline name={name} value={value} disabled={readOnly} />
    </Grid>
  )
}

export default ViewTextArea

{
  /* <Grid item xs={12}>
                <InputLabel htmlFor='summary'>Summary</InputLabel>
                <TextField
                  fullWidth
                  rows={12}
                  multiline
                  id='summary'
                  name='summary'
                  value={summary || ''}
                  required
                  onChange={e => setSummary(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position='start'></InputAdornment>
                  }}
                />
              </Grid> */
}
