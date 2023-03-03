import { FlashList } from '@shopify/flash-list'
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router'
import { type FunctionComponent, useEffect, useRef } from 'react'
import { View } from 'react-native'
import { useTranslations } from 'use-intl'

import { ConnectionStatus } from '~/components/chat/connection'
import { ChatMessage } from '~/components/chat/message'
import { ChatReply, type ChatReplyComponent } from '~/components/chat/reply'
import { ChatStatusCard } from '~/components/chat/status'
import { Empty } from '~/components/common/empty'
import { useProfile } from '~/hooks/auth/profile'
import { useChat } from '~/hooks/chat/chat'
import { tw } from '~/lib/tailwind'
import { usePresence } from '~/providers/presence'
import { type ChatMessageView } from '~/schemas/chat/message'

const Screen: FunctionComponent = () => {
  const navigation = useNavigation()
  const params = useLocalSearchParams()

  const t = useTranslations('screen.chat')

  const { profile } = useProfile()

  const list = useRef<FlashList<ChatMessageView>>(null)
  const chatReply = useRef<ChatReplyComponent>(null)

  const id = String(params.id)

  const { connected, members, messages } = useChat(id)
  const { users } = usePresence()

  useFocusEffect(() => {
    navigation.setOptions({
      title: t('loading'),
    })
  })

  useEffect(() => {
    const them = members.find(({ id }) => id !== profile?.id)

    navigation.setOptions({
      headerRight: () => <ConnectionStatus online={connected} />,
      headerTitle: () => (
        <ChatStatusCard online={them ? users.includes(them.id) : false}>
          {them?.name}
        </ChatStatusCard>
      ),
    })
  }, [connected, members, navigation, profile?.id, users])

  return (
    <>
      <FlashList
        ItemSeparatorComponent={() => <View style={tw`h-4`} />}
        ListEmptyComponent={() => <Empty title={t('empty.title')} />}
        contentContainerStyle={tw`pb-4 bg-gray-1`}
        data={messages}
        estimatedItemSize={100}
        inverted
        keyboardShouldPersistTaps="handled"
        ref={list}
        renderItem={({ item }) => (
          <ChatMessage message={item} style={tw`mx-4`} userId={profile?.id} />
        )}
      />

      <ChatReply
        channelId={id}
        disabled={!connected}
        onReply={() =>
          list.current?.scrollToOffset({
            offset: 0,
          })
        }
        ref={chatReply}
      />
    </>
  )
}

export default Screen
