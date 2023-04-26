// ** Next Imports
import Head from 'next/head'
import { Router } from 'next/router'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'
import Authentication from 'src/@core/context/authContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import "../../styles/Booking.Module.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const clientSideEmotionCache = createEmotionCache()

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start()
  })
  Router.events.on('routeChangeError', () => {
    NProgress.done()
  })
  Router.events.on('routeChangeComplete', () => {
    NProgress.done()
  })
}

// ** Configure JSS & ClassName
const App = props => {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <Authentication>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{`${themeConfig.templateName} Retreat `}</title>
          <meta
            name='description'
            content={`${themeConfig.templateName} - Ayahuasca admin panel.`}
          />
          <meta name='keywords' content='Ayahuasca Admin' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>

        <SettingsProvider>
          <SettingsConsumer>
            {({ settings }) => {
              return <ThemeComponent settings={settings}>
                {
                  getLayout(
                    <>
                      <ToastContainer />
                      <Component {...pageProps} />
                    </>
                  )
                }
              </ThemeComponent>
            }}
          </SettingsConsumer>
        </SettingsProvider>
      </CacheProvider>
    </Authentication>
  )
}

export default App
