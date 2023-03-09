import {
  type FunctionComponent,
  type ReactNode,
  useEffect,
  useRef,
} from 'react'
import { ScrollView, type StyleProp, View, type ViewStyle } from 'react-native'
import ActionSheet, {
  type ActionSheetRef,
  useScrollHandlers,
} from 'react-native-actions-sheet'
import {
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context'

import { useKeyboard } from '~/hooks/keyboard'
import { getSpace, tw } from '~/lib/tailwind'

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

  const ref = useRef<ActionSheetRef>(null)
  const scrollHandlers = useScrollHandlers<ScrollView>('modal', ref)

  const keyboard = useKeyboard()

  useEffect(() => {
    if (visible === true) {
      ref.current?.show()
    }

    if (visible === false) {
      ref.current?.hide()
    }
  }, [visible])

  const container = scrollable ? (
    <ScrollView
      {...scrollHandlers}
      contentContainerStyle={[
        tw.style(
          'p-4',
          !keyboard.visible && inset && `pb-[${bottom + getSpace(4)}px]`
        ),
        style,
      ]}
      keyboardDismissMode="on-drag"
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
    <ActionSheet onClose={() => onClose()} ref={ref}>
      <View
        style={tw`bg-gray-1 rounded-t-xl max-h-[${
          height - top - getSpace(8)
        }px]`}
      >
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
    </ActionSheet>
  )
}
