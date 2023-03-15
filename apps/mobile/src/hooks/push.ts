import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { useCallback } from 'react'
import { Platform } from 'react-native'

import { trpc } from '~/lib/trpc'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowAlert: true,
  }),
})

export const usePush = () => {
  const register = trpc.notifications.register.useMutation()

  const permissions = useCallback(async () => {
    const { status } = await Notifications.getPermissionsAsync()

    if (status !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()

      if (status !== 'granted') {
        return false
      }
    }

    return true
  }, [])

  const setup = useCallback(
    async (deviceId: string) => {
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          importance: Notifications.AndroidImportance.MAX,
          name: 'default',
        })
      }

      if (Device.isDevice) {
        const granted = await permissions()

        if (!granted) {
          return
        }

        const { data, type } = await Notifications.getExpoPushTokenAsync()

        await register.mutateAsync({
          id: deviceId,
          token: data,
          type,
        })
      }
    },
    [permissions, register]
  )

  return {
    setup,
  }
}
