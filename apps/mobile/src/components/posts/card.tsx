import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { type FunctionComponent } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useIntl } from 'use-intl'

import { getImageUrl } from '~/lib/supabase'
import { type TailwindColor, tw } from '~/lib/tailwind'
import { type RouterOutput } from '~/trpc/types'

import { Icon, type IconName } from '../common/icon'
import { Pressable } from '../common/pressable'
import { Typography } from '../common/typography'
import { Gallery } from './gallery'

type Props = {
  post: RouterOutput['posts']['list']['posts'][number]
  style?: StyleProp<ViewStyle>
}

export const PostCard: FunctionComponent<Props> = ({ post, style }) => {
  const router = useRouter()

  const intl = useIntl()

  const footer: Array<{
    icon: IconName
    iconColor?: TailwindColor
    label: string
  }> = [
    {
      icon: 'like',
      iconColor: post.liked ? 'primary-11' : undefined,
      label: intl.formatNumber(post._count.likes, {
        notation: 'compact',
      }),
    },
    {
      icon: 'comment',
      label: intl.formatNumber(post._count.comments, {
        notation: 'compact',
      }),
    },
    {
      icon: 'clock',
      label: intl.formatRelativeTime(post.createdAt),
    },
  ]

  return (
    <View style={[tw`gap-4`, style]}>
      <Pressable
        onPress={() => router.push(`/users/${post.user.id}`)}
        style={tw`flex-row items-center gap-2`}
      >
        <Image
          source={getImageUrl(post.user.image)}
          style={tw`bg-gray-3 h-6 w-6 rounded-full`}
        />

        <Typography lines={1} size="sm" style={tw`flex-1`} weight="medium">
          {post.user.name}
        </Typography>
      </Pressable>

      <Pressable
        onPress={() => router.push(`/posts/${post.id}`)}
        style={tw`gap-4`}
      >
        <Typography>{post.body}</Typography>

        <Gallery
          images={post.meta.attachments
            .filter(({ type }) => type === 'image')
            .map(({ url }) => url)}
        />

        <View style={tw`flex-row gap-4`}>
          {footer.map(({ icon, iconColor, label }, index) => (
            <View key={index} style={tw`flex-row items-center gap-1`}>
              <Icon
                color={iconColor ?? 'gray-11'}
                name={icon}
                style={tw`h-4 w-4`}
              />

              <Typography color="gray-11" size="sm">
                {label}
              </Typography>
            </View>
          ))}
        </View>
      </Pressable>
    </View>
  )
}
