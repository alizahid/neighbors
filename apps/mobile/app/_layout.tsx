import en from '@neighbors/shared/src/intl/en.json'
import { ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { type FunctionComponent } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { IntlProvider } from 'use-intl'

import { StackHeader } from '~/components/navigation/header'
import { fonts } from '~/lib/fonts'
import { tw } from '~/lib/tailwind'
import { theme } from '~/lib/theme'
import { ApiProvider } from '~/providers/api'

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
          <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={tw`flex-1`}
          >
            <Stack
              screenOptions={{
                header: (props) => <StackHeader {...props} />,
              }}
            />
          </KeyboardAvoidingView>
        </IntlProvider>
      </ApiProvider>
    </ThemeProvider>
  )
}

export default Layout
