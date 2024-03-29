import { FlashList } from '@shopify/flash-list'
import { useFocusEffect, useNavigation } from 'expo-router'
import { type FunctionComponent } from 'react'
import { useTranslations } from 'use-intl'

import { ChannelCard } from '~/components/chat/channel'
import { Empty } from '~/components/common/empty'
import { Refresher } from '~/components/common/refresher'
import { Separator } from '~/components/common/separator'
import { useProfile } from '~/hooks/auth/profile'
import { tw } from '~/lib/tailwind'
import { useChannels } from '~/providers/chat'

const Screen: FunctionComponent = () => {
  const navigation = useNavigation()

  const t = useTranslations('screen.chat')

  const { profile } = useProfile()

  const { channels, loading, refetch } = useChannels()

  useFocusEffect(() => {
    navigation.setOptions({
      title: t('title'),
    })
  })

  return (
    <FlashList
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={() => (loading ? null : <Empty title={t('empty')} />)}
      data={channels ?? []}
      estimatedItemSize={80}
      refreshControl={<Refresher onRefresh={refetch} />}
      renderItem={({ item }) => (
        <ChannelCard channel={item} style={tw`p-4`} userId={profile?.id} />
      )}
    />
  )
}

export default Screen
