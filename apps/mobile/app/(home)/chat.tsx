import { FlashList } from '@shopify/flash-list'
import { useFocusEffect, useNavigation } from 'expo-router'
import { type FunctionComponent, useEffect } from 'react'
import { View } from 'react-native'
import { useTranslations } from 'use-intl'

import { ChannelCard } from '~/components/chat/channel'
import { ConnectionStatus } from '~/components/chat/connection'
import { Empty } from '~/components/common/empty'
import { Refresher } from '~/components/common/refresher'
import { useProfile } from '~/hooks/auth/profile'
import { useChannels } from '~/hooks/chat/channels'
import { tw } from '~/lib/tailwind'

const Screen: FunctionComponent = () => {
  const navigation = useNavigation()

  const t = useTranslations('screen.chat')

  const { profile } = useProfile()

  const { channels, connected, loading, refetch } = useChannels()

  useFocusEffect(() => {
    navigation.setOptions({
      title: t('title'),
    })
  })

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <ConnectionStatus online={connected} />,
      title: t('title'),
    })
  }, [connected, navigation, t])

  return (
    <FlashList
      ItemSeparatorComponent={() => <View style={tw`h-px bg-gray-6`} />}
      ListEmptyComponent={() =>
        loading ? null : <Empty title={t('empty.title')} />
      }
      data={channels ?? []}
      estimatedItemSize={200}
      refreshControl={<Refresher onRefresh={refetch} refreshing={loading} />}
      renderItem={({ item }) => (
        <ChannelCard channel={item} style={tw`p-4`} userId={profile?.id} />
      )}
    />
  )
}

export default Screen
