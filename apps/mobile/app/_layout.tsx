import { ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { type FunctionComponent, useEffect } from 'react'

import { fonts } from '~/lib/fonts'
import { theme } from '~/lib/theme'
import { ApiProvider } from '~/providers/api'

SplashScreen.preventAutoHideAsync()

const Layout: FunctionComponent = () => {
  const [loaded] = useFonts(fonts)

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={theme}>
      <ApiProvider>
        <Slot />
      </ApiProvider>
    </ThemeProvider>
  )
}

export default Layout
