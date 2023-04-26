// ** MUI Imports
import Grid from '@mui/material/Grid'
import AllRetreats from 'src/views/retreats/AllRetreats';

const TypographyPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AllRetreats />
      </Grid>
    </Grid>
  )
}

export default TypographyPage
