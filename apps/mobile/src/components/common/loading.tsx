import { type FunctionComponent } from 'react'
import { View } from 'react-native'

import { tw } from '~/lib/tailwind'

import { Spinner } from './spinner'

export const Loading: FunctionComponent = () => (
  <View style={tw`flex-1 items-center justify-center`}>
    <Spinner size="large" />
  </View>
)
