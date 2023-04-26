// ** MUI Imports
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { Box, Divider, Link } from '@mui/material'
import AddRetreatForm from './AddRetreatForm'
import { useRouter } from 'next/router'
import ViewBookingsTable from './ViewBookingsTable'

const ViewBookings = () => {
  const router = useRouter()
  return (
    <Card>
      <Grid container spacing={6}>
        <Grid item xs={8}>
          <CardHeader title='Retreat Bookings' titleTypographyProps={{ variant: 'h6' }} />
        </Grid>
        <Grid item xs={4} >
          <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'end', paddingRight: 5 }}>
            <Button  onClick={() => router.push("/admin/retreats")} size='small' variant='contained'>Back to retreats</Button>
          </Box>
        </Grid>
      </Grid>
          <Divider sx={{ margin: 0 }} />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
                <ViewBookingsTable />
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ViewBookings
