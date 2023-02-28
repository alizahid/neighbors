import { Image } from 'expo-image'
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router'
import { type FunctionComponent } from 'react'
import { ScrollView } from 'react-native'
import { useTranslations } from 'use-intl'

import { Loading } from '~/components/common/loading'
import { Typography } from '~/components/common/typography'
import { getImageUrl } from '~/lib/supabase'
import { tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'

const Screen: FunctionComponent = () => {
  const navigation = useNavigation()
  const params = useLocalSearchParams()

  const t = useTranslations('screen.user')

  const user = trpc.users.get.useQuery({
    id: String(params.id),
  })

  useFocusEffect(() => {
    navigation.setOptions({
      title: t('title'),
    })
  })

  if (user.isLoading) {
    return <Loading />
  }

  if (!user.data) {
    return <Loading />
  }

  return (
    <ScrollView contentContainerStyle={tw`p-4 flex-grow items-center gap-4`}>
      <Image
        source={getImageUrl(user.data.image)}
        style={tw`bg-gray-3 h-32 w-32 rounded-full`}
      />

      <Typography size="2xl" weight="bold">
        {user.data.name}
      </Typography>
    </ScrollView>
  )
}

export default Screen
