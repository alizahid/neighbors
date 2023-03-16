import { type FunctionComponent, type ReactNode } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'

import { tw } from '~/lib/tailwind'

import { Icon } from './icon'
import { Typography } from './typography'

type Props = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  variant?: 'message' | 'error' | 'success'
}

export const Message: FunctionComponent<Props> = ({
  children,
  style,
  variant = 'message',
}) => (
  <View
    style={[
      tw.style(
        'flex-row items-center gap-2 rounded-lg border p-3',
        variant === 'success'
          ? 'border-green-6 bg-green-3'
          : variant === 'error'
          ? 'border-red-6 bg-red-3'
          : 'border-yellow-6 bg-yellow-3'
      ),
    ]}
  >
    <Icon
      color={
        variant === 'success'
          ? 'green-9'
          : variant === 'error'
          ? 'red-9'
          : 'yellow-9'
      }
      name={
        variant === 'success' ? 'ok' : variant === 'error' ? 'error' : 'info'
      }
    />

    <Typography style={tw`flex-1`}>{children}</Typography>
  </View>
)
