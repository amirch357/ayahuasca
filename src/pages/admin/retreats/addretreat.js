// ** MUI Imports
import Grid from '@mui/material/Grid'
import AddRetreat from 'src/views/retreats/AddRetreat';

const TypographyPage = () => {
  return (
    <Grid container spacing={6}>
     
      <Grid item xs={12}>
        <AddRetreat />
      </Grid>
    </Grid>
  )
}

export default TypographyPage
