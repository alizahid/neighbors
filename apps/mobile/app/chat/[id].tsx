import { FlashList } from '@shopify/flash-list'
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router'
import { type FunctionComponent, useEffect } from 'react'
import { useTranslations } from 'use-intl'

import { ChatMessage } from '~/components/chat/message'
import { ChatReply } from '~/components/chat/reply'
import { ChatStatusCard } from '~/components/chat/status'
import { Empty } from '~/components/common/empty'
import { useProfile } from '~/hooks/auth/profile'
import { useChat } from '~/hooks/chat/chat'
import { tw } from '~/lib/tailwind'
import { usePresence } from '~/providers/presence'

const Screen: FunctionComponent = () => {
  const navigation = useNavigation()
  const params = useLocalSearchParams()

  const t = useTranslations('screen.chat')

  const { profile } = useProfile()

  const id = String(params.id)

  const { channel, connected, fetchMore, loading, messages } = useChat(id)
  const { users } = usePresence()

  useFocusEffect(() => {
    navigation.setOptions({
      title: t('loading'),
    })
  })

  useEffect(() => {
    const them = channel?.members.find(({ userId }) => userId !== profile?.id)

    navigation.setOptions({
      headerTitle: () => (
        <ChatStatusCard online={them ? users.includes(them.userId) : false}>
          {them?.name}
        </ChatStatusCard>
      ),
    })
  }, [channel?.members, connected, navigation, profile?.id, users])

  return (
    <>
      <FlashList
        ListEmptyComponent={() =>
          loading ? null : (
            <Empty
              style={{
                transform: [
                  {
                    scaleY: -1,
                  },
                ],
              }}
              title={t('empty.title')}
            />
          )
        }
        contentContainerStyle={tw`py-4`}
        data={messages}
        estimatedItemSize={100}
        inverted
        keyboardShouldPersistTaps="handled"
        onEndReached={fetchMore}
        renderItem={({ index, item }) => (
          <ChatMessage
            first={index === messages.length - 1}
            last={index === 0}
            message={item}
            style={tw`mx-4`}
            userId={profile?.id}
          />
        )}
      />

      <ChatReply channelId={id} disabled={!connected} />
    </>
  )
}

export default Screen
