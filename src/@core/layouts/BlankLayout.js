// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import ArrowUp from 'mdi-material-ui/ArrowUp'
import ScrollToTop from 'src/@core/components/scroll-to-top'

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)(({ theme }) => ({
  height: '100vh',

  // For V1 Blank layout pages
  '& .content-center': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },

  // For V2 Blank layout pages
  '& .content-right': {
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}))

const BlankLayout = ({ children, scrollToTop }) => {

  return (
    <>
    <BlankLayoutWrapper className='layout-wrapper'>
      <Box className='app-content' sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
        {children }
      </Box>
    </BlankLayoutWrapper>
    {scrollToTop ? (
      scrollToTop(props)
    ) : (
      <ScrollToTop className='mui-fixed'>
        <Fab className='fab' size='small' aria-label='scroll back to top'>
          <ArrowUp sx={{width: '24px'}} />
        </Fab>
      </ScrollToTop>
    )}
    </>
  )
}

export default BlankLayout
