import { Image } from 'expo-image'
import { type FunctionComponent, useState } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import stc from 'string-to-color'

import { getTextColor } from '~/lib/avatar'
import { getImageUrl } from '~/lib/supabase'
import { tw } from '~/lib/tailwind'

import { Typography } from '../common/typography'

type Props = {
  image?: string | null
  name?: string
  online?: boolean
  style?: StyleProp<ViewStyle>
}

export const Avatar: FunctionComponent<Props> = ({
  image,
  name,
  online,
  style,
}) => {
  const [height, setHeight] = useState(24)

  const color = stc(name)

  return (
    <View
      onLayout={(event) => setHeight(event.nativeEvent.layout.height)}
      style={[
        tw`h-12 w-12 rounded-full items-center justify-center bg-[${color}]`,
        style,
      ]}
    >
      {image ? (
        <Image
          source={getImageUrl(image)}
          style={tw`h-full w-full rounded-full`}
        />
      ) : name ? (
        <Typography
          style={{
            color: getTextColor(color),
            fontSize: height * 0.5,
            lineHeight: undefined,
          }}
          weight="semibold"
        >
          {name[0].toUpperCase()}
        </Typography>
      ) : null}

      {online !== undefined && (
        <View
          style={tw.style(
            'h-3 w-3 rounded-lg absolute bottom-0 right-0',
            online ? 'bg-green-9' : 'bg-gray-9'
          )}
        />
      )}
    </View>
  )
}
