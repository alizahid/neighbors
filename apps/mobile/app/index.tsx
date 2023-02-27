import {
  Redirect,
  SplashScreen,
  useFocusEffect,
  useNavigation,
  useRouter,
} from 'expo-router'
import { type FunctionComponent } from 'react'
import { View } from 'react-native'
import { useTranslations } from 'use-intl'

import { Button } from '~/components/common/button'
import { Typography } from '~/components/common/typography'
import { useProfile } from '~/hooks/auth/profile'
import { tw } from '~/lib/tailwind'

const Screen: FunctionComponent = () => {
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
    return <Redirect href="/home" />
  }

  return (
    <View style={tw`items-center flex-1 justify-center gap-8`}>
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

      <View style={tw`flex-row gap-4`}>
        <Button onPress={() => router.push('/auth/sign-up')} variant="accent">
          {t('signUp')}
        </Button>

        <Button onPress={() => router.push('/auth/sign-in')}>
          {t('signIn')}
        </Button>
      </View>
    </View>
  )
}

export default Screen
