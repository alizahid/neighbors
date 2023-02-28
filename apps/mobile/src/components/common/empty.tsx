import LottieView from 'lottie-react-native'
import { type FunctionComponent } from 'react'
import { View } from 'react-native'
import { useSafeAreaFrame } from 'react-native-safe-area-context'

import { tw } from '~/lib/tailwind'
import not_found from '~/lottie/not-found.json'

import { Button } from './button'
import { Typography } from './typography'

type Props = {
  title?: string
  message?: string
  label?: string

  onPress?: () => void
}

export const Empty: FunctionComponent<Props> = ({
  label,
  message,
  onPress,
  title,
}) => {
  const { width } = useSafeAreaFrame()

  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <LottieView
        autoPlay
        source={not_found}
        style={tw`h-[${width}px] w-[${width}px]`}
      />

      <View style={tw`-mt-16 gap-2 items-center justify-center p-8`}>
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
