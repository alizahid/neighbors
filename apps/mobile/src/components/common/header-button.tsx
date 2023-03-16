import { type FunctionComponent, type ReactNode } from 'react'
import {
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native'

import { type TailwindColor, tw } from '~/lib/tailwind'

import { Pressable } from './pressable'
import { Spinner } from './spinner'
import { Typography } from './typography'

type Props = Pick<PressableProps, 'disabled' | 'onPress'> & {
  children: ReactNode
  color?: TailwindColor
  loading?: boolean
  style?: StyleProp<ViewStyle>
}

export const HeaderButton: FunctionComponent<Props> = ({
  children,
  color = 'accent-11',
  disabled,
  loading,
  onPress,
  style,
}) => (
  <Pressable
    disabled={loading || disabled}
    onPress={onPress}
    style={[tw`h-12 items-center justify-center px-4`, style]}
  >
    {loading ? (
      <Spinner color={color} />
    ) : (
      <Typography color={color} weight="medium">
        {children}
      </Typography>
    )}
  </Pressable>
)
