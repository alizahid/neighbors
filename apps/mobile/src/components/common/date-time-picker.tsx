import {
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getYear,
  roundToNearestMinutes,
  set,
} from 'date-fns'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useFormatter } from 'use-intl'

import { tw } from '~/lib/tailwind'

import { Calendar } from './calendar'
import { Icon } from './icon'
import { Modal } from './modal'
import { Pressable } from './pressable'
import { TimePicker } from './time-picker'
import { Typography } from './typography'

export type DateTimePickerComponent = {
  focus: () => void
  open: () => void
}

type Props = {
  error?: string
  hint?: string
  label?: string
  max?: Date
  min?: Date
  placeholder?: string
  style?: StyleProp<ViewStyle>
  value?: Date

  onChange: (value: Date) => void
}

// eslint-disable-next-line react/display-name
export const DateTimePicker = forwardRef<DateTimePickerComponent, Props>(
  (
    { error, hint, label, max, min, onChange, placeholder, style, value },
    ref
  ) => {
    const formatter = useFormatter()

    useImperativeHandle(ref, () => ({
      focus: () => setVisible(true),
      open: () => setVisible(true),
    }))

    const [visible, setVisible] = useState(false)

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
              'flex-row items-center justify-between h-12 bg-gray-2 rounded-lg border border-gray-7 px-3',
              error && 'border-red-7'
            )}
          >
            <Typography color={value ? 'gray-12' : 'gray-9'}>
              {value
                ? formatter.dateTime(value, {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })
                : placeholder}
            </Typography>

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
          <Calendar
            max={max}
            min={min}
            onChange={(date) => {
              const next = set(
                value ??
                  roundToNearestMinutes(new Date(), {
                    nearestTo: 30,
                  }),
                {
                  date: getDate(date),
                  month: getMonth(date),
                  year: getYear(date),
                }
              )

              onChange(next)
            }}
            value={value}
          />

          <TimePicker
            max={max}
            min={min}
            onChange={(time) => {
              const next = set(value ?? new Date(), {
                hours: getHours(time),
                minutes: getMinutes(time),
              })

              onChange(next)
            }}
            value={value}
          />
        </Modal>
      </>
    )
  }
)
