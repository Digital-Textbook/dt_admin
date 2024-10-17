import Grid from '@mui/material/Grid'

import UserTable from '@/views/student/user'

const userViewPage = () => {
  return (
    <Grid item sm={12} md={12} lg={12}>
      <UserTable />
    </Grid>
  )
}

export default userViewPage
