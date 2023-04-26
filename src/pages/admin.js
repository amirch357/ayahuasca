import Grid from '@mui/material/Grid'

import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

import Trophy from 'src/views/dashboard/Trophy'


const Dashboard = () => {
 
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
