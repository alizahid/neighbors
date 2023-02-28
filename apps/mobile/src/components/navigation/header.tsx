import { type BottomTabHeaderProps } from '@react-navigation/bottom-tabs'
import { type NativeStackHeaderProps } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import { type FunctionComponent } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { tw } from '~/lib/tailwind'

import { IconButton } from '../common/icon-button'
import { Typography } from '../common/typography'

type Props = NativeStackHeaderProps | BottomTabHeaderProps

export const StackHeader: FunctionComponent<Props> = ({
  navigation,
  options,
  ...props
}) => {
  const { top } = useSafeAreaInsets()

  const modal =
    (options as NativeStackHeaderProps['options']).presentation === 'modal'

  return (
    <View
      style={tw`bg-gray-1 pt-[${modal ? 0 : top}px] border-b border-gray-6`}
    >
      {modal && <StatusBar style="light" />}

      <View style={tw`items-center justify-center h-12`}>
        {'back' in props && (
          <IconButton
            name={modal ? 'close' : 'left'}
            onPress={() => navigation.goBack()}
            style={tw`absolute bottom-0 left-0`}
          />
        )}

        {typeof options.headerTitle === 'function' ? (
          options.headerTitle({
            children: options.title ?? 'Screen',
          })
        ) : (
          <Typography weight="bold">{options.title}</Typography>
        )}

        {options.headerRight && (
          <View style={tw`flex-row absolute bottom-0 right-0`}>
            {options.headerRight({
              canGoBack: navigation.canGoBack(),
            })}
          </View>
        )}
      </View>
    </View>
  )
}
