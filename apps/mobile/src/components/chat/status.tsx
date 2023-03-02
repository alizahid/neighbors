import { type FunctionComponent, type ReactNode } from 'react'
import { View } from 'react-native'

import { tw } from '~/lib/tailwind'

import { Typography } from '../common/typography'

type Props = {
  children: ReactNode
  online?: boolean
}

export const ChatStatusCard: FunctionComponent<Props> = ({
  children,
  online,
}) => (
  <View style={tw`flex-row items-center gap-2`}>
    <View
      style={tw.style(
        'h-3 w-3 rounded-full',
        online ? 'bg-green-9' : 'bg-gray-9'
      )}
    />

    <Typography weight="bold">{children}</Typography>
  </View>
)
