import { type FunctionComponent, type ReactNode } from 'react'
import { type StyleProp, Text, type TextStyle } from 'react-native'

import { type TailwindColor, type TailwindFontSize, tw } from '~/lib/tailwind'

type Props = {
  children: ReactNode
  color?: TailwindColor
  lines?: number
  size?: TailwindFontSize
  style?: StyleProp<TextStyle>
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
}

export const Typography: FunctionComponent<Props> = ({
  children,
  color = 'gray-12',
  lines,
  size = 'base',
  style,
  weight = 'regular',
}) => (
  <Text
    numberOfLines={lines}
    style={[tw`font-body-${weight} text-${size} text-${color}`, style]}
  >
    {children}
  </Text>
)
