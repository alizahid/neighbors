import { type FunctionComponent, type ReactNode } from 'react'
import { ScrollView, type StyleProp, View, type ViewStyle } from 'react-native'
import ModalReactNative from 'react-native-modal'
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

import { tw } from '~/lib/tailwind'

import { Typography } from './typography'

type Props = {
  children: ReactNode
  inset?: boolean
  scrollable?: boolean
  style?: StyleProp<ViewStyle>
  title?: string
  visible: boolean

  onClose: () => void
}

export const Modal: FunctionComponent<Props> = ({
  children,
  inset,
  onClose,
  scrollable,
  style,
  title,
  visible,
}) => {
  const { height } = useSafeAreaFrame()
  const { bottom, top } = useSafeAreaInsets()

  const container = scrollable ? (
    <ScrollView
      contentContainerStyle={[tw`p-4`, style]}
      keyboardShouldPersistTaps="handled"
      scrollIndicatorInsets={{
        right: 1,
      }}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[tw`p-4`, style]}>{children}</View>
  )

  return (
    <ModalReactNative
      avoidKeyboard
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={tw.style('justify-end m-0')}
      useNativeDriver
      useNativeDriverForBackdrop
    >
      <View
        style={tw.style(
          `bg-gray-1 rounded-t-xl max-h-[${height - top}px]`,
          inset && `pb-[${bottom}px]`
        )}
      >
        <View style={tw`p-4 border-b border-gray-6`}>
          <Typography size="xl" weight="semibold">
            {title}
          </Typography>
        </View>

        {container}
      </View>
    </ModalReactNative>
  )
}
