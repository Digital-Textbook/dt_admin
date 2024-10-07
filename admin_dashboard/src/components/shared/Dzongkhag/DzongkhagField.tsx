import { TextField, InputAdornment, MenuItem, InputLabel, Grid } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

interface Dzongkhag {
  id: string
  name: string
  title: string
}

interface CustomDzongkhagSelectProps {
  value: string
  onChange: (dzongkhagId: string, dzongkhagName: string) => void
  required?: boolean
}

const DzongkhagTextField: FC<CustomDzongkhagSelectProps> = ({ value, onChange, required = false }) => {
  const [dzongkhagData, setDzongkhagData] = useState<Dzongkhag[]>([])

  useEffect(() => {
    const fetchDzongkhagData = async () => {
      try {
        const response: AxiosResponse<Dzongkhag[]> = await axios.get(
          'http://localhost:3001/digital-textbook/common/dzongkhag'
        )
        setDzongkhagData(response.data)
      } catch (error) {
        console.error('Error fetching dzongkhag data from database!', error)
        toast.error('Error while fetching dzongkhag data from database!')
      }
    }

    fetchDzongkhagData()
  }, [])

  return (
    <Grid item xs={12} sm={6}>
      <InputLabel htmlFor='dzongkhag'>Dzongkhag</InputLabel>
      <TextField
        select
        fullWidth
        id='dzongkhag'
        name='dzongkhag'
        value={value}
        required={required}
        onChange={e => {
          const selectedDzongkhag = dzongkhagData.find(dzo => dzo.name === e.target.value)
          if (selectedDzongkhag) {
            onChange(selectedDzongkhag.id, selectedDzongkhag.name)
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <i className='ri-map-pin-line' />
            </InputAdornment>
          )
        }}
      >
        {dzongkhagData.map(dzo => (
          <MenuItem key={dzo.id} value={dzo.name}>
            {dzo.name}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  )
}

export default DzongkhagTextField

// const [dzongkhagData, setDzongkhagData] = useState<dzongkhags[]>([])

// useEffect(() => {
//     const fetchDzongkhagData = async () => {
//       try {
//         const response: AxiosResponse<dzongkhags[]> = await axios.get(
//           'http://localhost:3001/digital-textbook/common/dzongkhag'
//         )
//         setDzongkhagData(response.data)
//       } catch (error) {
//         console.error('Error dzongkhag data from database!', error)
//         toast.error('Error while fetching dzongkhag data from database!')
//       }
//     }

//     fetchDzongkhagData()
//   }, [])

// <Grid item xs={12} sm={6}>
// <InputLabel htmlFor='dzongkhag'>Dzongkhag</InputLabel>
// <TextField
//   select
//   fullWidth
//   id='dzongkhag'
//   name='dzongkhag'
//   value={dzongkhag}
//   required
//   onChange={e => {
//     const selectedDzongkhag = dzongkhagData.find(dzo => dzo.name === e.target.value)
//     if (selectedDzongkhag) {
//       setDzongkhag(e.target.value)
//       setDzongkhagId(selectedDzongkhag.id)
//     }
//   }}
//   InputProps={{
//     startAdornment: (
//       <InputAdornment position='start'>
//         <i className='ri-map-pin-line' />
//       </InputAdornment>
//     )
//   }}
// >
//   {dzongkhagData.map(dzo => (
//     <MenuItem key={dzo.id} value={dzo.name}>
//       {dzo.name}
//     </MenuItem>
//   ))}
// </TextField>
// </Grid>
