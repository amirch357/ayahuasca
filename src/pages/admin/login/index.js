
import { useState, useEffect } from 'react'

import { toast } from 'react-toastify'

import Link from 'next/link'
import { useRouter } from 'next/router'


import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'


import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'


import themeConfig from 'src/configs/themeConfig'

import BlankLayout from 'src/@core/layouts/BlankLayout'

import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration'

const LogoImage = styled('img')({
  right: 0,
  bottom: 0,
})


const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {

  
  const router = useRouter()

  
  const [password, setPassword] = useState({
    password: '',
    showPassword: false
  });

  const HandlePassword = prop => event => {
    setPassword({ ...password, [prop]: event.target.value })
  }

  const HandleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword })
  }

  const HandleMouseDownPassword = event => {
    event.preventDefault()
  }

  const host = "http://localhost:3007";

  const [email, setEmail] = useState("");
  const HandleEmail = (e) => setEmail(e.target.value)


  const submitHandler = async (e) => {
    var user_password = password.password;
    await fetch(host + '/admin_verify_login', {
      body: JSON.stringify({
        email: email,
        password: user_password
      }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then(
      response => response.json()
    ).then(res => {
      if (res.msg === "success") {
        localStorage.setItem('token', res.adminLogin.token);
        localStorage.setItem("userData", JSON.stringify(res.adminLogin))
        router.push('/admin');
      } else if (res.msg === "error") {
        return toast.error(res.response, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    })
  }


  
  return (
    <Box className='content-center'>
    
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LogoImage src={`/images/favicon.png`} />
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          
          <form noValidate autoComplete='off'>
            <TextField autoFocus fullWidth id='email' label='Email' onChange={HandleEmail} sx={{ marginBottom: 4 }} />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={password.password}
                id='auth-login-password'
                onChange={HandlePassword('password')}
                name="password"
                type={password.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={HandleClickShowPassword}
                      onMouseDown={HandleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {password.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box sx={{ pt: 3, pb: 3, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'end' }}>

              <Button
                fullWidth
                size='large'
                variant='contained'
                sx={{ marginBottom: 7 }}
                onClick={submitHandler}
              
              >
                Login
              </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography variant='body2' sx={{ marginRight: 2 }}>
                Forgot Password?
              </Typography>
              <Typography variant='body2'>
                <Link passHref href='/admin/forgotpassword'>
                  <LinkStyled>Recover !</LinkStyled>
                </Link>
              </Typography>
            </Box>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage
