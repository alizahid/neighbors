import { SENTRY_DSN } from '@env'
import { ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { getCalendars } from 'expo-localization'
import { SplashScreen } from 'expo-router'
import { type FunctionComponent } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import * as Sentry from 'sentry-expo'
import { IntlProvider } from 'use-intl'

import { Root } from '~/components/navigation/root'
import en from '~/intl/en.json'
import { fonts } from '~/lib/fonts'
import { tw } from '~/lib/tailwind'
import { theme } from '~/lib/theme'
import { ApiProvider } from '~/providers/api'
import { ChatProvider } from '~/providers/chat'
import { PresenceProvider } from '~/providers/presence'
import { ToastProvider } from '~/providers/toast'

Sentry.init({
  dsn: SENTRY_DSN,
})

const [calendar] = getCalendars()

const Layout: FunctionComponent = () => {
  const [loaded] = useFonts(fonts)

  if (!loaded) {
    return <SplashScreen />
  }

  return (
    <ThemeProvider value={theme}>
      <IntlProvider
        locale="en"
        messages={en}
        now={new Date()}
        timeZone={calendar?.timeZone ?? 'Asia/Dubai'}
      >
        <ApiProvider>
          <PresenceProvider>
            <ChatProvider>
              <ToastProvider>
                <KeyboardAvoidingView
                  behavior="padding"
                  enabled={Platform.OS === 'ios'}
                  style={tw`flex-1`}
                >
                  <Root />
                </KeyboardAvoidingView>
              </ToastProvider>
            </ChatProvider>
          </PresenceProvider>
        </ApiProvider>
      </IntlProvider>
    </ThemeProvider>
  )
}

export default Layout
