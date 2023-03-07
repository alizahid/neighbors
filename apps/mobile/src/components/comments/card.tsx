import { useRouter } from 'expo-router'
import { type FunctionComponent } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'

import { getSpace, tw } from '~/lib/tailwind'
import { type RouterOutput } from '~/trpc/types'

import { Pressable } from '../common/pressable'
import { TimeAgo } from '../common/time-ago'
import { Typography } from '../common/typography'
import { Avatar } from '../users/avatar'

export const COMMENT_CARD_HEIGHT =
  getSpace(5) + // user
  getSpace(2) + // gap
  getSpace(6) // body

export type CommentCardItem =
  RouterOutput['comments']['list']['comments'][number]

type Props = {
  comment: CommentCardItem
  style?: StyleProp<ViewStyle>
}

export const CommentCard: FunctionComponent<Props> = ({ comment, style }) => {
  const router = useRouter()

  return (
    <View style={[tw`flex-row gap-2`, style]}>
      <Pressable onPress={() => router.push(`/users/${comment.user.id}`)}>
        <Avatar
          image={comment.user.image}
          name={comment.user.name}
          style={tw`h-5 w-5`}
        />
      </Pressable>

      <View style={tw`flex-1`}>
        <View style={tw`flex-row gap-2`}>
          <Typography lines={1} size="sm" style={tw`flex-1`} weight="medium">
            {comment.user.name}
          </Typography>

          <Typography color="gray-11" size="sm">
            <TimeAgo>{comment.createdAt}</TimeAgo>
          </Typography>
        </View>

        <Typography>{comment.body}</Typography>
      </View>
    </View>
  )
}
