import { addMinutes, roundToNearestMinutes, subMinutes } from 'date-fns'
import { type FunctionComponent } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useFormatter } from 'use-intl'

import { tw } from '~/lib/tailwind'

import { IconButton } from './icon-button'
import { Typography } from './typography'

type Props = {
  max?: Date
  min?: Date
  style?: StyleProp<ViewStyle>
  value?: Date

  onChange: (date: Date) => void
}

export const TimePicker: FunctionComponent<Props> = ({
  max,
  min,
  onChange,
  style,
  value,
}) => {
  const formatter = useFormatter()

  return (
    <View style={[tw`flex-row items-center`, style]}>
      <IconButton
        name="left"
        onPress={() => {
          const next = roundToNearestMinutes(
            subMinutes(value ?? new Date(), 30),
            {
              nearestTo: 30,
            }
          )

          if (min && next < min) {
            return
          }

          onChange(next)
        }}
      />

      <Typography align="center" style={tw`flex-1`}>
        {value
          ? formatter.dateTime(value, {
              hour: 'numeric',
              minute: 'numeric',
            })
          : '-'}
      </Typography>

      <IconButton
        name="right"
        onPress={() => {
          const next = roundToNearestMinutes(
            addMinutes(value ?? new Date(), 30),
            {
              nearestTo: 30,
            }
          )

          if (max && next > max) {
            return
          }

          onChange(next)
        }}
      />
    </View>
  )
}
