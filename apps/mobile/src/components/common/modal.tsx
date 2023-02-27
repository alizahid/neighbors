import { type FunctionComponent, type ReactNode } from 'react'
import { ScrollView, type StyleProp, View, type ViewStyle } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

import { getColor, getSpace, tw } from '~/lib/tailwind'

import { Typography } from './typography'

type Props = {
  actions?: ReactNode
  children: ReactNode
  inset?: boolean
  scrollable?: boolean
  style?: StyleProp<ViewStyle>
  title?: string
  visible: boolean

  onClose: () => void
}

export const Modal: FunctionComponent<Props> = ({
  actions,
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
      contentContainerStyle={[
        tw.style('p-4', inset && `pb-[${bottom + getSpace(4)}px]`),
        style,
      ]}
      keyboardShouldPersistTaps="handled"
      scrollIndicatorInsets={{
        right: 1,
      }}
    >
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        tw.style('p-4', inset && `pb-[${bottom + getSpace(4)}px]`),
        style,
      ]}
    >
      {children}
    </View>
  )

  return (
    <ReactNativeModal
      avoidKeyboard
      backdropColor={getColor('gray-12')}
      backdropOpacity={0.75}
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={tw.style('justify-end m-0')}
      useNativeDriver
      useNativeDriverForBackdrop
    >
      <View style={tw`bg-gray-1 rounded-t-xl max-h-[${height - top}px]`}>
        <View style={tw`h-12 flex-row border-b border-gray-6 items-center`}>
          <Typography size="lg" style={tw`flex-1 mx-4`} weight="semibold">
            {title}
          </Typography>

          {actions}
        </View>

        {container}
      </View>
    </ReactNativeModal>
  )
}
