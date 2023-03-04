import { useRouter } from 'expo-router'
import { type FunctionComponent } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useIntl } from 'use-intl'

import { getSpace, tw } from '~/lib/tailwind'
import { type RouterOutput } from '~/trpc/types'

import { Pressable } from '../common/pressable'
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

  const intl = useIntl()

  return (
    <View style={[tw`flex-row gap-2`, style]}>
      <Pressable onPress={() => router.push(`/users/${comment.user.id}`)}>
        <Avatar
          image={comment.user.image}
          name={comment.user.name}
          style={tw`h-6 w-6`}
        />
      </Pressable>

      <View style={tw`flex-1`}>
        <View style={tw`flex-row gap-2`}>
          <Typography lines={1} size="sm" weight="medium">
            {comment.user.name}
          </Typography>

          <Typography color="gray-11" lines={1} size="sm">
            {intl.formatRelativeTime(comment.createdAt)}
          </Typography>
        </View>

        <Typography>{comment.body}</Typography>
      </View>
    </View>
  )
}
