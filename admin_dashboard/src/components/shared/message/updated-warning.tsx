import { Grid, Box, Typography } from '@mui/material'

interface UpdateMessageProps {
  message: string
}

const UpdateMessage: React.FC<UpdateMessageProps> = ({ message }) => {
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
        Attention: Modifying the {message} information may have implications for related functionalities within the
        system. Please ensure that you have thoroughly reviewed the changes before proceeding. If you are confident in
        your updates, click the confirm button to proceed. If you have any doubts, consider canceling this operation.
      </Typography>
    </Grid>
  )
}

export default UpdateMessage
