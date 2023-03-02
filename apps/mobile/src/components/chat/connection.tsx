import { type FunctionComponent } from 'react'
import { View } from 'react-native'

import { tw } from '~/lib/tailwind'

import { Icon } from '../common/icon'

type Props = {
  online: boolean
}

export const ConnectionStatus: FunctionComponent<Props> = ({ online }) => (
  <View style={tw`h-12 w-12 items-center justify-center`}>
    <Icon color={online ? 'green-9' : 'red-9'} name="online" />
  </View>
)
