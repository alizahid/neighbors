import { type FunctionComponent, useCallback, useState } from 'react'
import { RefreshControl } from 'react-native'

import { getColor } from '~/lib/tailwind'

type Props = {
  onRefresh: () => Promise<unknown>
}

export const Refresher: FunctionComponent<Props> = ({ onRefresh }) => {
  const [refreshing, setRefreshing] = useState(false)

  const refresh = useCallback(async () => {
    if (!onRefresh) {
      return
    }

    setRefreshing(true)

    await onRefresh()

    setRefreshing(false)
  }, [onRefresh])

  return (
    <RefreshControl
      colors={[getColor('primary-11'), getColor('accent-11')]}
      onRefresh={refresh}
      refreshing={refreshing}
      tintColor={getColor('primary-11')}
    />
  )
}
