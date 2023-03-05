import { ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'
import { type FunctionComponent } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { IntlProvider } from 'use-intl'

import { Root } from '~/components/navigation/root'
import en from '~/intl/en.json'
import { fonts } from '~/lib/fonts'
import { tw } from '~/lib/tailwind'
import { theme } from '~/lib/theme'
import { ApiProvider } from '~/providers/api'
import { PresenceProvider } from '~/providers/presence'

const Layout: FunctionComponent = () => {
  const [loaded] = useFonts(fonts)

  if (!loaded) {
    return <SplashScreen />
  }

  return (
    <ThemeProvider value={theme}>
      <ApiProvider>
        <IntlProvider
          locale="en"
          messages={en}
          now={new Date()}
          timeZone="Asia/Dubai"
        >
          <PresenceProvider>
            <KeyboardAvoidingView
              behavior="padding"
              enabled={Platform.OS === 'ios'}
              style={tw`flex-1`}
            >
              <Root />
            </KeyboardAvoidingView>
          </PresenceProvider>
        </IntlProvider>
      </ApiProvider>
    </ThemeProvider>
  )
}

export default Layout
