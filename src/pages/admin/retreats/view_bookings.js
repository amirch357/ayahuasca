// ** MUI Imports
import Grid from '@mui/material/Grid'
import AddRetreat from 'src/views/retreats/AddRetreat';
import ViewBookings from 'src/views/retreats/ViewBookings';

const TypographyPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ViewBookings />
      </Grid>
    </Grid>
  )
}

export default TypographyPage
