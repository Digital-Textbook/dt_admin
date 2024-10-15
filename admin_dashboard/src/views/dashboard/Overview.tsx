'use client'
import { Card, CardContent, CardHeader, Grid, Paper, Typography } from '@mui/material'
import type { ThemeColor } from '@core/types'
import OptionMenu from '@core/components/option-menu'
import CustomAvatar from '@core/components/mui/Avatar'
import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type DashboardItem = {
  name: string
  count: string
  icon: string
  color: ThemeColor
}

const Overview = () => {
  const [dashboardData, setDashboardData] = useState<DashboardItem[]>([])
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response: AxiosResponse<DashboardItem[]> = await axios.get(
          'http://localhost:3001/digital-textbook/common/dashboard'
        )
        setDashboardData(response.data)
      } catch (err) {
        console.error('Error fetching dashobard item:', err)
        toast.error('Error while fetching dashboard item!')
      }
    }

    fetchDashboardData()
  }, [])

  console.log('Dashboard item::', dashboardData)
  return (
    <Card className='bs-full'>
      <CardHeader
        title='Digital Textbook'
        action={<OptionMenu iconClassName='text-textPrimary' options={['Refresh', 'Share', 'Update']} />}
        subheader={
          <p className='mbs-3'>
            <span className='font-medium text-textPrimary'>Overall analysis of 'Digital Textbook'</span>
          </p>
        }
      />
      <CardContent className='!pbs-5'>
        <Grid container spacing={6}>
          {dashboardData.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Grid
                component={Paper}
                elevation={3}
                className='flex items-center gap-3'
                sx={{ borderRadius: '8px' }}
                p={3}
              >
                <CustomAvatar variant='rounded' color={item.color} className='shadow-xs'>
                  <i className={item.icon}></i>
                </CustomAvatar>
                <div>
                  <Typography className='capitalize'>{item.name}</Typography>
                  <Typography variant='h5'>{item.count}</Typography>
                </div>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Overview
