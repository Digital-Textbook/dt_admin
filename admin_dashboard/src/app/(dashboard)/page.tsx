import { Grid } from '@mui/material'

import Overview from '@/views/dashboard/Overview'
import TimeChart from '@/views/dashboard/LineCharts'

const DashboardPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={12}>
        <Overview />
      </Grid>
      <Grid item xs={12} md={6} style={{ height: '400px' }}>
        <TimeChart />
      </Grid>
    </Grid>
  )
}

export default DashboardPage
