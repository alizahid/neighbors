import { type FunctionComponent, type ReactNode } from 'react'
import {
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

import { tw } from '~/lib/tailwind'

import { Pressable } from './pressable'
import { Spinner } from './spinner'
import { Typography } from './typography'

type Props = Pick<PressableProps, 'disabled' | 'onPress'> & {
  children: ReactNode
  loading?: boolean
  style?: StyleProp<ViewStyle>
}

export const HeaderButton: FunctionComponent<Props> = ({
  children,
  disabled,
  loading,
  onPress,
  style,
}) => (
  <Pressable
    disabled={loading || disabled}
    onPress={onPress}
    style={[tw`h-12 px-3 items-center justify-center`, style]}
  >
    {loading ? (
      <Spinner size="small" />
    ) : (
      <Typography color="primary-11" weight="semibold">
        {children}
      </Typography>
    )}
  </Pressable>
)
