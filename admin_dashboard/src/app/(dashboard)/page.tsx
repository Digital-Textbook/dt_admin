import Award from '@/views/dashboard/template/Award'
import Transactions from '@views/dashboard/template/Transactions'
import WeeklyOverview from '@/views/dashboard/template/WeeklyOverview'
import TotalEarning from '@/views/dashboard/template/TotalEarning'
import LineChart from '@/views/dashboard/template/LineChart'
import DistributedColumnChart from '@/views/dashboard/template/DistributedColumnChart'
import DepositWithdraw from '@/views/dashboard/template/DepositWithdraw'
import SalesByCountries from '@/views/dashboard/template/SalesByCountries'
import CardStatVertical from '@components/card-statistics/Vertical'
import { Grid } from '@mui/material'

import Overview from '@/views/dashboard/Overview'

const DashboardPage = () => {
  return (
    <Grid container spacing={6}>
      {/* <Grid item xs={12} md={4}>
        <Award />
      </Grid> */}
      <Grid item xs={12} md={12}>
        <Overview />
      </Grid>
      {/* <Grid item xs={12} md={6} lg={4}>
        <WeeklyOverview />
      </Grid> */}
      {/* <Grid item xs={12} md={6} lg={4}>
        <TotalEarning />
      </Grid> */}
      {/* <Grid item xs={12} md={6} lg={4}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <LineChart />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardStatVertical
              title='Total Profit'
              stats='$25.6k'
              avatarIcon='ri-pie-chart-2-line'
              avatarColor='secondary'
              subtitle='Weekly Profit'
              trendNumber='42%'
              trend='positive'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardStatVertical
              stats='862'
              trend='negative'
              trendNumber='18%'
              title='New Project'
              subtitle='Yearly Project'
              avatarColor='primary'
              avatarIcon='ri-file-word-2-line'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DistributedColumnChart />
          </Grid>
        </Grid>
      </Grid> */}
      {/* <Grid item xs={12} md={6} lg={4}>
        <SalesByCountries />
      </Grid>
      <Grid item xs={12} lg={8}>
        <DepositWithdraw />
      </Grid> */}
    </Grid>
  )
}

export default DashboardPage
