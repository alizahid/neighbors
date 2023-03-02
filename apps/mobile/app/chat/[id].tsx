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
import { ChatMessage, type MessageItem } from '~/components/chat/message'
import { ChatReply, type ChatReplyComponent } from '~/components/chat/reply'
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

  const list = useRef<FlashList<MessageItem>>(null)
  const chatReply = useRef<ChatReplyComponent>(null)

  const id = String(params.id)

  const { channel, connected, messages } = useChat(id)
  const { users } = usePresence()

  useFocusEffect(() => {
    navigation.setOptions({
      title: t('loading'),
    })
  })

  useEffect(() => {
    if (!channel) {
      return
    }

    const them = channel.members.find(({ userId }) => userId !== profile?.id)

    navigation.setOptions({
      headerRight: () => <ConnectionStatus online={connected} />,
      headerTitle: () => (
        <ChatStatusCard online={them ? users.includes(them.userId) : false}>
          {them?.user.name}
        </ChatStatusCard>
      ),
    })
  }, [channel, connected, navigation, profile?.id, users])

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
          <ChatMessage
            channel={channel}
            message={item}
            style={tw`mx-4`}
            userId={profile?.id}
          />
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
