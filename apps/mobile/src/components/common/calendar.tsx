import { isSameDay } from 'date-fns'
import { type FunctionComponent } from 'react'
import { FlatList, type StyleProp, View, type ViewStyle } from 'react-native'
import { useFormatter } from 'use-intl'
import { useLilius } from 'use-lilius'

import { tw } from '~/lib/tailwind'

import { IconButton } from './icon-button'
import { Pressable } from './pressable'
import { Typography } from './typography'

type Props = {
  max?: Date
  min?: Date
  style?: StyleProp<ViewStyle>
  value?: Date

  onChange: (date: Date) => void
}

export const Calendar: FunctionComponent<Props> = ({
  max,
  min,
  onChange,
  style,
  value,
}) => {
  const formatter = useFormatter()

  const { calendar, viewNextMonth, viewPreviousMonth, viewing } = useLilius({
    selected: value ? [value] : undefined,
    viewing: value,
  })

  const data = calendar[0].flatMap((item) => item)

  return (
    <View style={style}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={tw`flex-row items-center justify-between`}>
              <IconButton name="left" onPress={viewPreviousMonth} />

              <Typography align="center" style={tw`flex-1`} weight="medium">
                {formatter.dateTime(viewing, {
                  month: 'short',
                  year: 'numeric',
                })}
              </Typography>

              <IconButton name="right" onPress={viewNextMonth} />
            </View>

            <View style={tw`flex-row self-center`}>
              {calendar[0][0].map((day, index) => (
                <View
                  key={`day-${index}`}
                  style={tw`justify-center flex-1 h-12`}
                >
                  <Typography align="center" weight="medium">
                    {formatter.dateTime(day, {
                      weekday: 'short',
                    })}
                  </Typography>
                </View>
              ))}
            </View>
          </>
        }
        data={data}
        keyboardShouldPersistTaps="handled"
        numColumns={7}
        renderItem={({ item }) => {
          const disabled =
            (min ? item <= min : false) || (max ? item >= max : false)

          const selected = value ? isSameDay(item, value) : false

          return (
            <Pressable
              disabled={disabled}
              onPress={() => onChange(item)}
              style={tw.style(
                `flex-1 h-12 justify-center rounded-lg`,
                selected && 'bg-primary-9'
              )}
            >
              <Typography
                align="center"
                color={selected ? 'gray-1' : disabled ? 'gray-11' : 'gray-12'}
              >
                {formatter.dateTime(item, {
                  day: 'numeric',
                })}
              </Typography>
            </Pressable>
          )
        }}
        scrollEnabled={false}
      />
    </View>
  )
}
