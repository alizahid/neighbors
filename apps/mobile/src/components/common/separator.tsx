import { type FunctionComponent } from 'react'
import { View } from 'react-native'

import { tw } from '~/lib/tailwind'

export const Separator: FunctionComponent = () => (
  <View style={tw`h-px bg-gray-6`} />
)
