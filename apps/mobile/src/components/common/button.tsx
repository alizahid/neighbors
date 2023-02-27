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
  variant?: 'primary' | 'accent' | 'text'
}

export const Button: FunctionComponent<Props> = ({
  children,
  disabled,
  loading,
  onPress,
  style,
  variant = 'primary',
}) => (
  <Pressable
    disabled={loading ?? disabled}
    onPress={onPress}
    style={[
      tw.style(
        'h-12 items-center flex-row gap-2 rounded-lg px-4 justify-center',
        variant === 'primary' && 'bg-primary-9',
        variant === 'accent' && 'bg-accent-9'
      ),
      style,
    ]}
  >
    <Typography
      color={variant === 'text' ? 'gray-12' : 'gray-1'}
      weight="semibold"
    >
      {children}
    </Typography>

    {loading && <Spinner />}
  </Pressable>
)
