'use client'

import type { MouseEvent } from 'react'

import { styled } from '@mui/material/styles'
import {
  Avatar,
  Badge,
  MenuItem,
  MenuList,
  Popper,
  ClickAwayListener,
  Typography,
  Divider,
  Button,
  Paper,
  Fade
} from '@mui/material'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useRef, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = () => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  const handleDropdownOpen = () => {
    !open ? setOpen(true) : setOpen(false)
  }

  const handleDropdownClose = (event?: MouseEvent<HTMLLIElement> | (MouseEvent | TouchEvent), url?: string) => {
    if (url) {
      router.push(url)
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target as HTMLElement)) {
      return
    }

    setOpen(false)
  }

  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData')
    const userData = storedUserData ? JSON.parse(storedUserData) : null
    setUser(userData)
  }, [])

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/digital-textbook/auth/${user.id}`)
        setProfile(response.data)
      } catch (err) {
        console.error('Error fetching textbook data:', err)
      }
    }

    if (user && user.id) {
      fetchAdminProfile()
    }
  }, [user])

  const handleLogout = async () => {
    localStorage.removeItem('adminAccessToken')
    try {
      localStorage.removeItem('adminAccessToken')
      localStorage.removeItem('userData')

      await axios.post(`http://localhost:3001/digital-textbook/auth/${user.id}/admin-logout`)
      setUser(null)
      toast.success('Logout successful!')

      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (error) {
      console.error('Error during logout:', error)
      toast.error('Error occurred during logout.')
    }
  }
  return (
    <>
      <ToastContainer />
      <Badge
        ref={anchorRef}
        overlap='circular'
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className='mis-2'
      >
        <Avatar
          ref={anchorRef}
          alt='John Doe'
          src='/images/avatars/1.png'
          onClick={handleDropdownOpen}
          className='cursor-pointer bs-[38px] is-[38px]'
        />
      </Badge>
      <Popper
        open={open}
        transition
        disablePortal
        placement='bottom-end'
        anchorEl={anchorRef.current}
        className='min-is-[240px] !mbs-4 z-[1]'
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper className='shadow-lg'>
              <ClickAwayListener onClickAway={e => handleDropdownClose(e as MouseEvent | TouchEvent)}>
                <MenuList>
                  <div className='flex items-center plb-2 pli-4 gap-2' tabIndex={-1}>
                    <Avatar alt='John Doe' src='/images/avatars/1.png' />
                    <div className='flex items-start flex-col'>
                      <Typography className='font-medium' color='text.primary'>
                        {profile?.name || 'No Name Available'}
                      </Typography>
                      <Typography>{profile?.role.name || 'No Roles Available'}</Typography>
                    </div>
                  </div>
                  <Divider className='mlb-1' />
                  <MenuItem className='gap-3' onClick={e => handleDropdownClose(e, `/account-settings?id=${user.id}`)}>
                    <i className='ri-user-3-line' />
                    <Typography color='text.primary'>My Profile</Typography>
                  </MenuItem>
                  <MenuItem className='gap-3' onClick={e => handleDropdownClose(e, `/change-password?id=${user.id}`)}>
                    <i className='ri-lock-password-line' />
                    <Typography color='text.primary'>Change Password</Typography>
                  </MenuItem>

                  <div className='flex items-center plb-2 pli-4'>
                    <Button
                      fullWidth
                      variant='contained'
                      color='error'
                      size='small'
                      endIcon={<i className='ri-logout-box-r-line' />}
                      onClick={handleLogout}
                      sx={{ '& .MuiButton-endIcon': { marginInlineStart: 1.5 } }}
                    >
                      Logout
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default UserDropdown
