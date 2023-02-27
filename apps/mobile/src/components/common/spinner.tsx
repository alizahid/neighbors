import { type FunctionComponent } from 'react'
import { ActivityIndicator, type ActivityIndicatorProps } from 'react-native'

import { getColor } from '~/lib/tailwind'

type Props = Pick<ActivityIndicatorProps, 'size' | 'style'>

export const Spinner: FunctionComponent<Props> = ({ size, style }) => (
  <ActivityIndicator color={getColor('gray-1')} size={size} style={style} />
)
