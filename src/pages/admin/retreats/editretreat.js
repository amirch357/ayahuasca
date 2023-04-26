// ** MUI Imports
import Grid from '@mui/material/Grid'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import EditRetreat from 'src/views/retreats/EditRetreat';

const TypographyPage = () => {
  return (
    <Grid container spacing={6}>
      <ToastContainer />
      <Grid item xs={12}>
        <EditRetreat />
      </Grid>
    </Grid>
  )
}

export default TypographyPage
