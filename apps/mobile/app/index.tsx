import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { Redirect, useFocusEffect, useNavigation, useRouter } from 'expo-router'
import { type FunctionComponent } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslations } from 'use-intl'

import { Loading } from '~/components/common/loading'
import { Pressable } from '~/components/common/pressable'
import { Typography } from '~/components/common/typography'
import { useProfile } from '~/hooks/auth/profile'
import hero from '~/img/hero.png'
import { getSpace, tw } from '~/lib/tailwind'

const Screen: FunctionComponent = () => {
  const { bottom, top } = useSafeAreaInsets()

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
    return <Loading />
  }

  if (profile) {
    if (profile.residencies.length > 0) {
      return <Redirect href="/home" />
    }

    return <Redirect href="/onboarding" />
  }

  return (
    <View style={tw`flex-1`}>
      <Image
        pointerEvents="none"
        source={hero}
        style={tw`absolute h-full w-full`}
      />

      <View style={tw`flex-1 mt-[${top + getSpace(20)}px]`}>
        <View style={tw`w-full`}>
          <Typography align="center" size="4xl" weight="bold">
            {t('title')}
          </Typography>

          <Typography align="center" color="gray-11" weight="medium">
            {t('description')}
          </Typography>
        </View>
      </View>

      <View style={tw`flex-row gap-4 p-4 mb-[${bottom}px]`}>
        <Pressable
          onPress={() => router.push('/auth/sign-up')}
          style={tw`h-12 flex-1`}
        >
          <LinearGradient
            colors={['#84A89D', '#496C60']}
            end={{
              x: 1,
              y: 1,
            }}
            start={{
              x: 0,
              y: 0,
            }}
            style={tw`h-full w-full items-center justify-center rounded-lg`}
          >
            <Typography color="gray-1" weight="semibold">
              {t('signUp')}
            </Typography>
          </LinearGradient>
        </Pressable>

        <Pressable
          onPress={() => router.push('/auth/sign-in')}
          style={tw`h-12 flex-1`}
        >
          <LinearGradient
            colors={['#D8A1B3', '#A5556F']}
            end={{
              x: 1,
              y: 1,
            }}
            start={{
              x: 0,
              y: 0,
            }}
            style={tw`h-full w-full items-center justify-center rounded-lg`}
          >
            <Typography color="gray-1" weight="semibold">
              {t('signIn')}
            </Typography>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  )
}

export default Screen
