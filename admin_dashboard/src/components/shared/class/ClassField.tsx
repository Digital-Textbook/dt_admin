import { TextField, InputAdornment, MenuItem, InputLabel, Grid } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

interface Classes {
  id: string
  class: string
}

interface ClassSelectProps {
  value: string
  onChange: (classId: string, className: string) => void
  required?: boolean
}

const ClassTextField: FC<ClassSelectProps> = ({ value, onChange, required = false }) => {
  const [classData, setClassData] = useState<Classes[]>([])

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response: AxiosResponse<Classes[]> = await axios.get(
          'http://localhost:3001/digital-textbook/subject/class'
        )
        setClassData(response.data)
      } catch (error) {
        console.error('Error classes from database!', error)
        toast.error('Error while fetching classes from database!')
      }
    }

    fetchClassData()
  }, [])

  return (
    <Grid item xs={12} sm={6}>
      <InputLabel htmlFor='class'>Class</InputLabel>
      <TextField
        select
        fullWidth
        id='class'
        name='class'
        value={value}
        required={required}
        onChange={e => {
          const selectedClass = classData.find(cls => cls.class === e.target.value)
          if (selectedClass) {
            onChange(selectedClass.id, selectedClass.class)
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <i className='ri-graduation-cap-line' />
            </InputAdornment>
          )
        }}
      >
        {classData.map(cls => (
          <MenuItem key={cls.id} value={cls.class}>
            {cls.class}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  )
}

export default ClassTextField

// interface Classes {
//   id: string
//   class: string
// }
// const [classData, setClassData] = useState<Classes[]>([])
// useEffect(() => {
//   const fetchClassData = async () => {
//     try {
//       const response: AxiosResponse<Classes[]> = await axios.get(
//         'http://localhost:3001/digital-textbook/subject/class'
//       )
//       setClassData(response.data)
//     } catch (error) {
//       console.error('Error classes from database!', error)
//       toast.error('Error while fetching classes from database!')
//     }
//   }

//   fetchClassData()
// }, [])

{
  /* <Grid item xs={12} sm={6}>
                <InputLabel htmlFor='class'>Class</InputLabel>
                <TextField
                  select
                  fullWidth
                  id='class'
                  name='class'
                  value={grade}
                  required
                  onChange={e => {
                    const selectedClass = classData.find(cls => cls.class === e.target.value)
                    if (selectedClass) {
                      setGrade(e.target.value)
                      setClassId(selectedClass.id)
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <i className='ri-graduation-cap-line' />
                      </InputAdornment>
                    )
                  }}
                >
                  {classData.map(cls => (
                    <MenuItem key={cls.id} value={cls.class}>
                      {cls.class}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid> */
}
