import { Grid, Box, Typography } from '@mui/material'

interface WarningMessageProps {
  message: string
}

const WarningMessage: React.FC<WarningMessageProps> = ({ message }) => {
  return (
    <Grid
      item
      xs={12}
      sm={12}
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        backgroundColor: '#fff8e1',
        padding: '20px',
        color: '#FFB400',
        borderRadius: '16px',
        marginLeft: '20px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '36px',
          width: '36px',
          marginRight: '10px'
        }}
      >
        <i className='ri-error-warning-line' style={{ fontSize: '36px' }} />
      </Box>
      <Typography sx={{ color: '#FFB400' }}>
        Important Notice: Deleting the {message} will permanently remove all associated data from the system. This
        action cannot be undone. Please confirm that you wish to proceed with this deletion, as it may impact any
        ongoing processes related to this {message}. If you have any reservations, it is advisable to cancel this
        action.
      </Typography>
    </Grid>
  )
}

export default WarningMessage
