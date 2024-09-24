'use client'

import { Avatar, AvatarGroup, Card, CardContent, Chip, Container, Grid, IconButton, Typography } from '@mui/material'
import Link from 'next/link'
import tableStyles from '@core/styles/table.module.css'

// Third-party Imports
import classnames from 'classnames'
import CustomAvatar from '@/@core/components/mui/Avatar'

type TableBodyRowType = {
  avatarSrc?: string
  name: string
  username: string
  email: string
  iconClass: string
  roleIcon?: string
  role: string
  status: string
}

// Vars
const rowsData: TableBodyRowType[] = [
  {
    avatarSrc: '/images/avatars/1.png',
    name: 'Jordan Stevenson',
    username: '@amiccoo',
    email: 'Jacinthe_Blick@hotmail.com',
    iconClass: 'text-primary',
    roleIcon: 'ri-vip-crown-line',
    role: 'Admin',
    status: 'pending'
  },
  {
    avatarSrc: '/images/avatars/2.png',
    name: 'Richard Payne',
    username: '@brossiter15',
    email: 'Jaylon_Bartell3@gmail.com',
    iconClass: 'text-warning',
    roleIcon: 'ri-edit-box-line',
    role: 'Editor',
    status: 'active'
  },
  {
    avatarSrc: '/images/avatars/3.png',
    name: 'Jennifer Summers',
    username: '@jsbemblinf',
    email: 'Tristin_Johnson@gmail.com',
    iconClass: 'text-error',
    roleIcon: 'ri-computer-line',
    role: 'Author',
    status: 'active'
  },
  {
    avatarSrc: '/images/avatars/4.png',
    name: 'Mr. Justin Richardson',
    username: '@justin45',
    email: 'Toney21@yahoo.com',
    iconClass: 'text-warning',
    roleIcon: 'ri-edit-box-line',
    role: 'Editor',
    status: 'pending'
  },
  {
    avatarSrc: '/images/avatars/5.png',
    name: 'Nicholas Tanner',
    username: '@tannernic',
    email: 'Hunter_Kuhic68@hotmail.com',
    iconClass: 'text-info',
    roleIcon: 'ri-pie-chart-2-line',
    role: 'Maintainer',
    status: 'active'
  },
  {
    avatarSrc: '/images/avatars/6.png',
    name: 'Crystal Mays',
    username: '@crystal99',
    email: 'Norene_Bins@yahoo.com',
    iconClass: 'text-warning',
    roleIcon: 'ri-edit-box-line',
    role: 'Editor',
    status: 'pending'
  },
  {
    avatarSrc: '/images/avatars/7.png',
    name: 'Mary Garcia',
    username: '@marygarcia4',
    email: 'Emmitt.Walker14@hotmail.com',
    iconClass: 'text-info',
    roleIcon: 'ri-pie-chart-2-line',
    role: 'Maintainer',
    status: 'inactive'
  },
  {
    avatarSrc: '/images/avatars/8.png',
    name: 'Megan Roberts',
    username: '@megan78',
    email: 'Patrick.Howe73@gmail.com',
    iconClass: 'text-success',
    roleIcon: 'ri-user-3-line',
    role: 'Subscriber',
    status: 'active'
  }
]

const RoleSettingsPage = () => {
  return (
    <Grid item xs={12} flexDirection='row'>
      <Typography fontSize={24} mt={5} fontWeight={'400'}>
        Role List
      </Typography>
      <Typography>
        A role provided access to predefined menus and features so that depending on assigned role an administrator can
        have access to what he need
      </Typography>
      <Grid container spacing={5} mt={5}>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={1}>
            <CardContent className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <Typography variant='body1' className='flex-grow'>
                  Total 4 users
                </Typography>
                <AvatarGroup max={4}>
                  <Avatar alt='Administrator' src='/images/avatars/1.png' />
                  <Avatar alt='Administrator' src='/images/avatars/2.png' />
                  <Avatar alt='Administrator' src='/images/avatars/3.png' />
                  <Avatar alt='Administrator' src='/images/avatars/4.png' />
                </AvatarGroup>
              </div>

              {/* Content Section with Title and Edit Role Link */}
              <div className='flex justify-between items-center'>
                <div className='flex flex-col items-start gap-1'>
                  <Typography variant='h5'>Administrator</Typography>

                  <Link href='/permission' style={{ color: '#765feb' }}>
                    Edit Role
                  </Link>
                </div>

                {/* Icon Button */}
                <IconButton aria-label='copy'>{<i className='ri-graduation-cap-line' />}</IconButton>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={1}>
            <CardContent className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <Typography variant='body1' className='flex-grow'>
                  Total 4 users
                </Typography>
                <AvatarGroup max={4}>
                  <Avatar alt='Administrator' src='/images/avatars/1.png' />
                  <Avatar alt='Administrator' src='/images/avatars/2.png' />
                  <Avatar alt='Administrator' src='/images/avatars/3.png' />
                  <Avatar alt='Administrator' src='/images/avatars/4.png' />
                </AvatarGroup>
              </div>

              {/* Content Section with Title and Edit Role Link */}
              <div className='flex justify-between items-center'>
                <div className='flex flex-col items-start gap-1'>
                  <Typography variant='h5'>Super Admin</Typography>

                  <Link href='/permission' style={{ color: '#765feb' }}>
                    Edit Role
                  </Link>
                </div>

                {/* Icon Button */}
                <IconButton aria-label='copy'>{<i className='ri-graduation-cap-line' />}</IconButton>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={1}>
            <CardContent className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <Typography variant='body1' className='flex-grow'>
                  Total 4 users
                </Typography>
                <AvatarGroup max={4}>
                  <Avatar alt='Administrator' src='/images/avatars/1.png' />
                  <Avatar alt='Administrator' src='/images/avatars/2.png' />
                  <Avatar alt='Administrator' src='/images/avatars/3.png' />
                  <Avatar alt='Administrator' src='/images/avatars/4.png' />
                </AvatarGroup>
              </div>

              {/* Content Section with Title and Edit Role Link */}
              <div className='flex justify-between items-center'>
                <div className='flex flex-col items-start gap-1'>
                  <Typography variant='h5'>Administrator</Typography>

                  <Link href='/permission' style={{ color: '#765feb' }}>
                    Edit Role
                  </Link>
                </div>

                {/* Icon Button */}
                <IconButton aria-label='copy'>{<i className='ri-graduation-cap-line' />}</IconButton>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={1}>
            <CardContent className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <Typography variant='body1' className='flex-grow'>
                  Total 4 users
                </Typography>
                <AvatarGroup max={4}>
                  <Avatar alt='Administrator' src='/images/avatars/1.png' />
                  <Avatar alt='Administrator' src='/images/avatars/2.png' />
                  <Avatar alt='Administrator' src='/images/avatars/3.png' />
                  <Avatar alt='Administrator' src='/images/avatars/4.png' />
                </AvatarGroup>
              </div>

              {/* Content Section with Title and Edit Role Link */}
              <div className='flex justify-between items-center'>
                <div className='flex flex-col items-start gap-1'>
                  <Typography variant='h5'>User</Typography>

                  <Link href='/permission' style={{ color: '#765feb' }}>
                    Edit Role
                  </Link>
                </div>

                {/* Icon Button */}
                <IconButton aria-label='copy'>{<i className='ri-graduation-cap-line' />}</IconButton>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* table title */}
      <Typography fontSize={24} mt={5} fontWeight={'200'}>
        Total users with their roles
      </Typography>
      <Typography fontSize={16} mb={5}>
        Find all of your company's administrator accounts and their associate roles.{' '}
      </Typography>

      <Card>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rowsData.map((row, index) => (
                <tr key={index}>
                  <td className='!plb-1'>
                    <div className='flex items-center gap-3'>
                      <CustomAvatar src={row.avatarSrc} size={34} />
                      <div className='flex flex-col'>
                        <Typography color='text.primary' className='font-medium'>
                          {row.name}
                        </Typography>
                        <Typography variant='body2'>{row.username}</Typography>
                      </div>
                    </div>
                  </td>
                  <td className='!plb-1'>
                    <Typography>{row.email}</Typography>
                  </td>
                  <td className='!plb-1'>
                    <div className='flex gap-2'>
                      <i className={classnames(row.roleIcon, row.iconClass, 'text-[22px]')} />
                      <Typography color='text.primary'>{row.role}</Typography>
                    </div>
                  </td>
                  <td className='!pb-1'>
                    <Chip
                      className='capitalize'
                      variant='tonal'
                      color={row.status === 'pending' ? 'warning' : row.status === 'inactive' ? 'secondary' : 'success'}
                      label={row.status}
                      size='small'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Grid>
  )
}

export default RoleSettingsPage
