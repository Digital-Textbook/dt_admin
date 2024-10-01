import Grid from '@mui/material/Grid'

import RoleSettingPage from '@/views/roles/role-settings'
import UserSetiingPage from '@views/roles/user-settings'

const RolePage = () => {
  return (
    <Grid item sm={12} md={12} lg={12}>
      <RoleSettingPage />
      <UserSetiingPage />
    </Grid>
  )
}

export default RolePage
