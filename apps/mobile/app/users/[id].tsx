import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from 'expo-router'
import { type FunctionComponent, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useTranslations } from 'use-intl'

import { IconButton } from '~/components/common/icon-button'
import { Loading } from '~/components/common/loading'
import { Typography } from '~/components/common/typography'
import { Avatar } from '~/components/users/avatar'
import { useProfile } from '~/hooks/auth/profile'
import { tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'

const Screen: FunctionComponent = () => {
  const router = useRouter()
  const navigation = useNavigation()
  const params = useLocalSearchParams()

  const t = useTranslations('screen.user')

  const { profile } = useProfile()

  const user = trpc.users.get.useQuery({
    id: String(params.id),
  })

  const startChat = trpc.chat.start.useMutation({
    onSuccess(id) {
      router.push(`/chat/${id}`)
    },
  })

  useFocusEffect(() => {
    navigation.setOptions({
      title: t('title'),
    })
  })

  useEffect(() => {
    if (!profile || !user.data || profile.id === user.data.id) {
      return
    }

    navigation.setOptions({
      headerRight: () => (
        <IconButton
          loading={startChat.isLoading}
          name="startChat"
          onPress={() =>
            startChat.mutate({
              userId: user.data!.id,
            })
          }
        />
      ),
    })
  }, [navigation, profile, startChat, user.data])

  if (user.isLoading) {
    return <Loading />
  }

  if (!user.data) {
    return <Loading />
  }

  return (
    <ScrollView
      contentContainerStyle={tw`p-4 flex-grow items-center`}
      keyboardDismissMode="on-drag"
    >
      <Avatar
        image={user.data.image}
        name={user.data.name}
        style={tw`h-32 w-32`}
      />

      <Typography size="2xl" style={tw`mt-4`} weight="bold">
        {user.data.name}
      </Typography>

      <Typography>{user.data.meta.bio}</Typography>
    </ScrollView>
  )
}

export default Screen
