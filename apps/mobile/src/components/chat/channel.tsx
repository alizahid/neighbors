import { useRouter } from 'expo-router'
import { type FunctionComponent } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useIntl } from 'use-intl'

import { tw } from '~/lib/tailwind'
import { usePresence } from '~/providers/presence'
import { type RouterOutput } from '~/trpc/types'

import { Pressable } from '../common/pressable'
import { Typography } from '../common/typography'
import { Avatar } from '../users/avatar'

export type ChannelItem = RouterOutput['chat']['channels'][number]

type Props = {
  channel: ChannelItem
  style?: StyleProp<ViewStyle>
  userId?: string
}

export const ChannelCard: FunctionComponent<Props> = ({
  channel,
  style,
  userId,
}) => {
  const router = useRouter()

  const intl = useIntl()

  const { users } = usePresence()

  const them = channel.members.find(({ user }) => user.id !== userId)
  const me = channel.members.find(({ user }) => user.id === userId)

  const online = them && users.includes(them.userId)

  const read = me?.checkedAt ? me.checkedAt > channel.updatedAt : false

  return (
    <Pressable
      onPress={() => router.push(`/chat/${channel.id}`)}
      style={[tw`flex-row items-center gap-2`, style]}
    >
      <Avatar badge={online} image={them?.user.image} name={them?.user.name} />

      <View style={tw`flex-1`}>
        <View style={tw`flex-row justify-between gap-4`}>
          <Typography weight="medium">{them?.user.name}</Typography>

          <Typography color="gray-11" size="sm">
            {intl.formatRelativeTime(channel.updatedAt)}
          </Typography>
        </View>

        <View style={tw`flex-row gap-2`}>
          {!!channel.message && (
            <Typography color="gray-11" lines={1} size="sm">
              {channel.message}
            </Typography>
          )}

          {!read && (
            <View style={tw`h-5 justify-center ml-auto`}>
              <View style={tw`h-2 w-2 bg-primary-9 rounded-full`} />
            </View>
          )}
        </View>
      </View>
    </Pressable>
  )
}
