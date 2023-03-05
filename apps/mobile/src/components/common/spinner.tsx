import { type FunctionComponent } from 'react'
import { ActivityIndicator, type ActivityIndicatorProps } from 'react-native'

import { getColor, type TailwindColor } from '~/lib/tailwind'

type Props = Pick<ActivityIndicatorProps, 'size' | 'style'> & {
  color?: TailwindColor
}

export const Spinner: FunctionComponent<Props> = ({
  color = 'primary-11',
  size = 'small',
  style,
}) => <ActivityIndicator color={getColor(color)} size={size} style={style} />
