import { createId } from '@paralleldrive/cuid2'
import * as Application from 'expo-application'
import * as SecureStore from 'expo-secure-store'
import { useCallback, useEffect, useState } from 'react'
import { Platform } from 'react-native'

export const useDeviceId = () => {
  const [deviceId, setDeviceId] = useState<string>()

  const fetch = useCallback(async () => {
    if (Platform.OS === 'android') {
      return setDeviceId(Application.androidId ?? undefined)
    }

    const exists = await SecureStore.getItemAsync('device_id')

    if (exists) {
      return setDeviceId(exists)
    }

    const next = createId()

    await SecureStore.setItemAsync('device_id', next)

    return setDeviceId(next)
  }, [])

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    deviceId,
  }
}
