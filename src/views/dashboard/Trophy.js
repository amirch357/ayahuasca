// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { Grid } from '@mui/material'
import { useEffect, useState, } from 'react'
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 185,
  position: 'absolute'
})

const Trophy = () => {
  const host = "http://localhost:3007";
  const [totalretreats, setRetreatData] = useState([]);
  const GetRetreats = async (e) => {
    await fetch(host + '/get_retreats', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }).then(
      response => response.json()
    ).then(res => {
      const result = res.allretreats;
      setRetreatData(result.length);
    })
  };
  useEffect(() => {
    GetRetreats()
  }, []);
  
  const router = useRouter()
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent>
        <Typography variant='h6'>Retreats <sub style={{ fontSize: '12px' }}>Total Retreats</sub></Typography>
        <Grid container sx={{ justifyContent: 'center'}}>
          <Grid item>
            <Typography variant='h5' sx={{ my: 2, color: 'primary.main' }}>{totalretreats}</Typography>
          </Grid>
        </Grid>
        <Grid container sx={{ justifyContent: 'end' }}>
            <Button sx={{ zIndex: '9999'}} size='small' variant='contained' onClick={() => router.push("/admin/retreats")}>
              View
            </Button>
        </Grid>
        <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
      </CardContent>
    </Card>
  )
}

export default Trophy
