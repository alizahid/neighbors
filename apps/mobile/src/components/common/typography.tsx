import { type FunctionComponent } from 'react'
import { Text, type TextProps } from 'react-native'

import { type TailwindColor, type TailwindFontSize, tw } from '~/lib/tailwind'

type Props = Pick<TextProps, 'children' | 'style'> & {
  align?: 'left' | 'center' | 'right'
  color?: TailwindColor
  lines?: number
  size?: TailwindFontSize
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
}

export const Typography: FunctionComponent<Props> = ({
  align = 'left',
  children,
  color = 'gray-12',
  lines,
  size = 'base',
  style,
  weight = 'regular',
}) => (
  <Text
    numberOfLines={lines}
    style={[
      tw`font-body-${weight} text-${size} text-${color} text-${align}`,
      style,
    ]}
  >
    {children}
  </Text>
)
