// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'

// Styles Imports
import tableStyles from '@core/styles/table.module.css'
import { Box, Button, Divider, Grid, IconButton } from '@mui/material'
import Link from 'next/link'

type TableBodyRowType = {
  name: string
  cidNo: string
  mobile: string
  userType: string
  status: string
  email: string
}

// Vars
const rowsData: TableBodyRowType[] = [
  {
    name: 'Sonam',
    cidNo: '11807001234',
    mobile: '17234567',
    userType: 'BhutaneseCid',
    status: 'active',
    email: 'sonam231@gmail.com!'
  },
  {
    name: 'Sangay',
    cidNo: '11807009876',
    mobile: '17000000',
    userType: 'BhutanesePermit',
    status: 'inactive',
    email: 'sola2001@gmail.com!'
  },
  {
    name: 'John',
    cidNo: '11807006523',
    mobile: '17987654',
    userType: 'Non-Bhutanese',
    status: 'inactive',
    email: 'john1999@gmail.com!'
  }
]

const UserTable = () => {
  return (
    <>
      <Grid item xs={12} flexDirection='row' sx={{ marginBottom: 5 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexGrow: 1,
              gap: 2
            }}
          >
            <Typography variant='h4'>User Table</Typography>
            <div className='flex items-center cursor-pointer gap-2' style={{ flexGrow: 1 }}>
              <IconButton className='text-textPrimary'>
                <i className='ri-search-line' />
              </IconButton>
              <div className='whitespace-nowrap select-none text-textDisabled'>Search</div>
            </div>
          </Box>
          <Link href='addTextbook' passHref>
            <Button
              variant='contained'
              sx={{
                background: 'green',
                color: 'white',
                '&:hover': {
                  background: '#4caf50'
                }
              }}
            >
              Add
            </Button>
          </Link>
        </Box>
        <Divider />
      </Grid>
      <Card>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>CID No.</th>
                <th>Mobile No.</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rowsData.map((row, index) => {
                return (
                  <tr key={index}>
                    <td className='!plb-1'>
                      <Typography>{row.name}</Typography>
                    </td>
                    <td className='!plb-1'>
                      <Typography>{row.cidNo}</Typography>
                    </td>
                    <td className='!plb-1'>
                      <Typography>{row.mobile}</Typography>
                    </td>
                    <td className='!plb-1'>
                      <Typography>{row.email}</Typography>
                    </td>
                    <td className='!plb-1'>
                      <Typography>{row.userType}</Typography>
                    </td>
                    <td className='!plb-1'>
                      <Typography>{row.status}</Typography>
                    </td>
                    <td className='!plb-1'>
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 1
                        }}
                      >
                        <Button
                          variant='contained'
                          sx={{
                            color: 'white',
                            background: 'green',
                            '&:hover': {
                              background: '#4caf50'
                            }
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant='contained'
                          sx={{
                            color: 'white',
                            background: 'red',
                            '&:hover': {
                              background: '#ef5350'
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}

export default UserTable
