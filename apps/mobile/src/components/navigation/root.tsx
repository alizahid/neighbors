import { SplashScreen, Stack } from 'expo-router'
import { type FunctionComponent } from 'react'

import { useProfile } from '~/hooks/auth/profile'

import { StackHeader } from './header'

export const Root: FunctionComponent = () => {
  const { loading, profile } = useProfile()

  if (loading) {
    return <SplashScreen />
  }

  return (
    <Stack
      initialRouteName={profile ? '/home' : undefined}
      screenOptions={({ route }) => ({
        gestureEnabled: !(route.name === '(home)' && !!profile),
        header: (props) => <StackHeader {...props} />,
      })}
    />
  )
}
