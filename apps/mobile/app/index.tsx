import { type FunctionComponent } from 'react'
import { View } from 'react-native'

import { Typography } from '~/components/common/typography'
import { tw } from '~/lib/tailwind'

const Screen: FunctionComponent = () => (
  <View style={tw`items-center flex-1 justify-center gap-4`}>
    <Typography>Hello</Typography>
  </View>
)

export default Screen
