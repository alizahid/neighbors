import { type FunctionComponent, type ReactNode } from 'react'
import { ScrollView, type StyleProp, View, type ViewStyle } from 'react-native'
import ReactNativeModal from 'react-native-modal'
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

import { useKeyboard } from '~/hooks/keyboard'
import { getColor, getSpace, tw } from '~/lib/tailwind'

import { Typography } from './typography'

type Props = {
  children: ReactNode
  inset?: boolean
  left?: ReactNode
  right?: ReactNode
  scrollable?: boolean
  style?: StyleProp<ViewStyle>
  title?: string
  visible: boolean

  onClose: () => void
}

export const Modal: FunctionComponent<Props> = ({
  children,
  inset,
  left,
  onClose,
  right,
  scrollable,
  style,
  title,
  visible,
}) => {
  const { height } = useSafeAreaFrame()
  const { bottom, top } = useSafeAreaInsets()

  const keyboard = useKeyboard()

  const container = scrollable ? (
    <ScrollView
      contentContainerStyle={[
        tw.style(
          'p-4',
          !keyboard.visible && inset && `pb-[${bottom + getSpace(4)}px]`
        ),
        style,
      ]}
      keyboardShouldPersistTaps="handled"
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
        {(!!title || left || right) && (
          <View style={tw`h-12 flex-row border-b border-gray-6 items-center`}>
            {!!title && (
              <Typography
                align="center"
                size="lg"
                style={tw`flex-1 mx-4`}
                weight="semibold"
              >
                {title}
              </Typography>
            )}

            {left && <View style={tw`flex-row absolute left-0`}>{left}</View>}

            {right && (
              <View style={tw`flex-row absolute right-0`}>{right}</View>
            )}
          </View>
        )}

        {container}
      </View>
    </ReactNativeModal>
  )
}
