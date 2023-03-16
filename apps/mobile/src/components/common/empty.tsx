import { Image } from 'expo-image'
import { type FunctionComponent } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

import not_found from '~/img/not-found.png'
import { tw } from '~/lib/tailwind'

import { Button } from './button'
import { Typography } from './typography'

type Props = {
  label?: string
  message?: string
  style?: StyleProp<ViewStyle>
  title?: string

  onPress?: () => void
}

export const Empty: FunctionComponent<Props> = ({
  label,
  message,
  onPress,
  style,
  title,
}) => {
  const { width } = useSafeAreaFrame()

  const size = `${width * 0.8}px`

  return (
    <View style={[tw`flex-1 items-center justify-center`, style]}>
      <Image
        contentFit="contain"
        source={not_found}
        style={tw`h-[${size}] w-[${size}] ml-12`}
      />

      <View style={tw`-mt-6 gap-2 items-center justify-center p-8`}>
        {!!title && (
          <Typography align="center" size="lg" weight="semibold">
            {title}
          </Typography>
        )}

        {!!message && <Typography align="center">{message}</Typography>}

        {!!label && (
          <Button
            onPress={onPress}
            styleLabel={tw`text-primary-11`}
            variant="text"
          >
            {label}
          </Button>
        )}
      </View>
    </View>
  )
}
