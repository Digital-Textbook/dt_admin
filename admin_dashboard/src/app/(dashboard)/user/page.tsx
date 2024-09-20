import Grid from '@mui/material/Grid'

import UserTable from '@/views/users/user-table/user-table'

const userTablePage = () => {
  return (
    <Grid item sm={12} md={12} lg={12}>
      <UserTable />
    </Grid>
  )
}

export default userTablePage
