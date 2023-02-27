import { type BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { type NativeStackHeaderProps } from '@react-navigation/native-stack'
import { type FunctionComponent } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { tw } from '~/lib/tailwind'

import { IconButton } from '../common/icon-button'
import { Typography } from '../common/typography'

export const StackHeader: FunctionComponent<
  NativeStackHeaderProps | BottomTabHeaderProps
> = ({ navigation, options, ...props }) => {
  const { top } = useSafeAreaInsets()

  return (
    <View style={tw`bg-gray-1 pt-[${top}px] border-b border-gray-6`}>
      <View style={tw`items-center justify-center h-12`}>
        {'back' in props && (
          <IconButton
            name="left"
            onPress={() => navigation.goBack()}
            style={tw`absolute bottom-0 left-0`}
          />
        )}

        <Typography weight="bold">{options.title}</Typography>
      </View>
    </View>
  )
}
