import { type FunctionComponent } from 'react'
import {
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

import { tw } from '~/lib/tailwind'

import { Icon, type IconName } from './icon'
import { Pressable } from './pressable'
import { Spinner } from './spinner'

type Props = Pick<PressableProps, 'disabled' | 'onPress'> & {
  loading?: boolean
  style?: StyleProp<ViewStyle>
  name: IconName
}

export const IconButton: FunctionComponent<Props> = ({
  disabled,
  loading,
  name,
  onPress,
  style,
}) => (
  <Pressable
    disabled={disabled}
    onPress={onPress}
    style={[tw`h-12 w-12 items-center justify-center`, style]}
  >
    {loading ? <Spinner size="small" /> : <Icon name={name} />}
  </Pressable>
)
