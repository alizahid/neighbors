import {
  Redirect,
  SplashScreen,
  useFocusEffect,
  useNavigation,
  useRouter,
} from 'expo-router'
import { type FunctionComponent } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslations } from 'use-intl'

import { Button } from '~/components/common/button'
import { Typography } from '~/components/common/typography'
import { useProfile } from '~/hooks/auth/profile'
import { tw } from '~/lib/tailwind'

const Screen: FunctionComponent = () => {
  const { bottom } = useSafeAreaInsets()

  const router = useRouter()
  const navigation = useNavigation()

  const t = useTranslations('screen.landing')

  const { loading, profile } = useProfile()

  useFocusEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  })

  if (loading) {
    return <SplashScreen />
  }

  if (profile) {
    if (profile.residencies.length > 0) {
      return <Redirect href="/home" />
    }

    return <Redirect href="/onboarding" />
  }

  return (
    <View style={tw`flex-1`}>
      <View style={tw`items-center flex-1 justify-center`}>
        <View style={tw`flex-row`}>
          {t.rich('title', {
            accent: (text) => (
              <Typography color="accent-11" size="4xl" weight="bold">
                {text}
              </Typography>
            ),
            primary: (text) => (
              <Typography color="primary-11" size="4xl" weight="bold">
                {text}
              </Typography>
            ),
          })}
        </View>
      </View>

      <View style={tw`flex-row p-4 gap-4 mb-[${bottom}px]`}>
        <Button
          onPress={() => router.push('/auth/sign-up')}
          style={tw`flex-1`}
          variant="text"
        >
          {t('signUp')}
        </Button>

        <Button onPress={() => router.push('/auth/sign-in')} style={tw`flex-1`}>
          {t('signIn')}
        </Button>
      </View>
    </View>
  )
}

export default Screen
