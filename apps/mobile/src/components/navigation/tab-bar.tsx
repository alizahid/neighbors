import { type BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { type FunctionComponent } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { getSpace, tw } from '~/lib/tailwind'

import { Pressable } from '../common/pressable'

type Props = BottomTabBarProps

export const TabBar: FunctionComponent<Props> = ({
  descriptors,
  navigation,
  state,
}) => {
  const { bottom } = useSafeAreaInsets()

  return (
    <View style={tw`bg-gray-1 flex-row border-t border-gray-6`}>
      {state.routes.map((route, index) => {
        const options = descriptors[route.key]

        const focused = index === state.index

        const onPress = () => {
          const event = navigation.emit({
            canPreventDefault: true,
            target: route.key,
            type: 'tabPress',
          })

          if (!focused && !event.defaultPrevented) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            navigation.navigate({
              merge: true,
              name: route.name,
            })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            target: route.key,
            type: 'tabLongPress',
          })
        }

        return (
          <Pressable
            key={route.key}
            onLongPress={onLongPress}
            onPress={onPress}
            style={tw`flex-1 items-center justify-center pb-[${bottom}px] h-[${
              getSpace(12) + bottom
            }px]`}
          >
            {options.options?.tabBarIcon?.({
              color: focused ? 'primary-9' : 'gray-9',
              focused,
              size: 0,
            })}
          </Pressable>
        )
      })}
    </View>
  )
}
