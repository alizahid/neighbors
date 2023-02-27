import { type FunctionComponent } from 'react'
import { RefreshControl, type RefreshControlProps } from 'react-native'

import { getColor } from '~/lib/tailwind'

type Props = Pick<RefreshControlProps, 'onRefresh' | 'refreshing'>

export const Refresher: FunctionComponent<Props> = ({
  onRefresh,
  refreshing,
}) => (
  <RefreshControl
    colors={[getColor('primary-11'), getColor('accent-11')]}
    onRefresh={onRefresh}
    refreshing={refreshing}
    tintColor={getColor('primary-11')}
  />
)
