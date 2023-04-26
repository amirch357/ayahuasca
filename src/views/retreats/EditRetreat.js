// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { Box, Divider, Link } from '@mui/material'
import EditRetreatForm from './EditRetreatForm'
import { useRouter } from 'next/router'

const EditRetreat = () => {
  const router = useRouter()
  return (
    <Card>
      <Grid container spacing={6}>
        <Grid item xs={8}>
          <CardHeader title='Edit Retreat' titleTypographyProps={{ variant: 'h6' }} />
        </Grid>
        <Grid item xs={4} >
          <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'end', paddingRight: 5 }}>
            <Button onClick={() => router.push("/admin/retreats")} size='small' variant='contained'>Back to retreats</Button>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ margin: 0 }} />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <EditRetreatForm />
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EditRetreat
