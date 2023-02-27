import { type FunctionComponent } from 'react'
import { View } from 'react-native'

import { Typography } from '~/components/common/typography'
import { useProfile } from '~/hooks/auth/profile'
import { tw } from '~/lib/tailwind'

const Screen: FunctionComponent = () => {
  const { profile } = useProfile()

  return (
    <View style={tw`p-4 flex-1 justify-center`}>
      <Typography size="sm">{JSON.stringify(profile, null, 2)}</Typography>
    </View>
  )
}

export default Screen
