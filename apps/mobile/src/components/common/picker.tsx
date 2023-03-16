import { forwardRef, useImperativeHandle, useState } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'

import { tw } from '~/lib/tailwind'

import { Icon } from '../common/icon'
import { Pressable } from '../common/pressable'
import { Typography } from '../common/typography'
import { Modal } from './modal'

export type PickerComponent = {
  focus: () => void
  open: () => void
}

type PickerItem = {
  label: string
  value: string
}

type Props = {
  error?: string
  hint?: string
  items: Array<PickerItem>
  label?: string
  placeholder?: string
  style?: StyleProp<ViewStyle>
  value?: string

  onChange: (value: string) => void
}

// eslint-disable-next-line react/display-name
export const Picker = forwardRef<PickerComponent, Props>(
  ({ error, hint, items, label, onChange, placeholder, style, value }, ref) => {
    useImperativeHandle(ref, () => ({
      focus: () => setVisible(true),
      open: () => setVisible(true),
    }))

    const [visible, setVisible] = useState(false)

    const item = items.find((item) => item.value === value)

    return (
      <>
        <View style={[tw`gap-1`, style]}>
          {!!label && (
            <Typography color="gray-11" size="sm" weight="medium">
              {label}
            </Typography>
          )}

          <Pressable
            onPress={() => setVisible(true)}
            style={tw.style(
              'h-12 flex-row items-center justify-between rounded-lg border border-gray-7 bg-gray-2 px-3',
              error && 'border-red-7'
            )}
          >
            <Typography>{item?.label ?? placeholder}</Typography>

            <Icon name="expand" style={tw`h-4 w-4`} />
          </Pressable>

          {!!hint && (
            <Typography color="gray-11" size="sm">
              {hint}
            </Typography>
          )}

          {!!error && (
            <Typography color="red-11" size="sm">
              {error}
            </Typography>
          )}
        </View>

        <Modal
          inset
          onClose={() => setVisible(false)}
          scrollable
          style={tw`gap-4`}
          title={label ?? placeholder}
          visible={visible}
        >
          {items.map((item) => (
            <Pressable
              key={item.value}
              onPress={() => {
                onChange(item.value)

                setVisible(false)
              }}
              style={tw`flex-row items-center gap-4`}
            >
              <Typography style={tw`flex-1`}>{item.label}</Typography>

              {item.value === value && (
                <View style={tw`h-3 w-3 rounded-full bg-primary-9`} />
              )}
            </Pressable>
          ))}
        </Modal>
      </>
    )
  }
)
