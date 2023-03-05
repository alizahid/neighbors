import { type FunctionComponent } from 'react'
import {
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

import { type TailwindColor, tw } from '~/lib/tailwind'

import { Icon, type IconName } from './icon'
import { Pressable } from './pressable'
import { Spinner } from './spinner'

type Props = Pick<PressableProps, 'disabled' | 'onPress'> & {
  color?: TailwindColor
  loading?: boolean
  name: IconName
  style?: StyleProp<ViewStyle>
}

export const IconButton: FunctionComponent<Props> = ({
  color,
  disabled,
  loading,
  name,
  onPress,
  style,
}) => (
  <Pressable
    disabled={loading || disabled}
    onPress={onPress}
    style={[tw`h-12 w-12 items-center justify-center`, style]}
  >
    {loading ? <Spinner color={color} /> : <Icon color={color} name={name} />}
  </Pressable>
)
