import { SplashScreen, Stack } from 'expo-router'
import { type FunctionComponent, useEffect } from 'react'

import { useProfile } from '~/hooks/auth/profile'
import { useDeviceId } from '~/hooks/device-id'
import { usePush } from '~/hooks/push'

import { StackHeader } from './header'

export const Root: FunctionComponent = () => {
  const { loading, profile } = useProfile()

  const { deviceId } = useDeviceId()
  const { setup } = usePush()

  useEffect(() => {
    if (!profile || !deviceId) {
      return
    }

    setup(deviceId)
  }, [deviceId, profile, setup])

  if (loading) {
    return <SplashScreen />
  }

  return (
    <Stack
      screenOptions={({ route }) => ({
        gestureEnabled: !(profile
          ? route.name === '(home)'
          : route.name === 'index'),
        header: (props) => <StackHeader {...props} />,
      })}
    />
  )
}
