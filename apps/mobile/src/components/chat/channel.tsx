import { useRouter } from 'expo-router'
import { type FunctionComponent } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'

import { tw } from '~/lib/tailwind'
import { usePresence } from '~/providers/presence'
import { type ChatChannelView } from '~/schemas/chat/channel'

import { Pressable } from '../common/pressable'
import { TimeAgo } from '../common/time-ago'
import { Typography } from '../common/typography'
import { Avatar } from '../users/avatar'

type Props = {
  channel: ChatChannelView
  style?: StyleProp<ViewStyle>
  userId?: string
}

export const ChannelCard: FunctionComponent<Props> = ({
  channel,
  style,
  userId,
}) => {
  const router = useRouter()

  const { users } = usePresence()

  const them = channel.members.find((member) => member.userId !== userId)
  const me = channel.members.find((member) => member.userId === userId)

  const online = them && users.includes(them.userId)

  const read = me?.checkedAt ? me.checkedAt > channel.updatedAt : false

  return (
    <Pressable
      onPress={() => router.push(`/chat/${channel.id}`)}
      style={[tw`flex-row items-center gap-2`, style]}
    >
      <Avatar image={them?.image} name={them?.name} online={online} />

      <View style={tw`flex-1`}>
        <View style={tw`flex-row justify-between gap-4`}>
          <Typography weight="medium">{them?.name}</Typography>

          <Typography color="gray-11" size="sm">
            <TimeAgo>{channel.updatedAt}</TimeAgo>
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
