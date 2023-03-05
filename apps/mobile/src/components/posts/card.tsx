import { useRouter } from 'expo-router'
import { compact } from 'lodash'
import { type FunctionComponent, useMemo } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useIntl, useTranslations } from 'use-intl'

import { type TailwindColor, tw } from '~/lib/tailwind'
import { type RouterOutput } from '~/trpc/types'

import { Icon, type IconName } from '../common/icon'
import { Pressable } from '../common/pressable'
import { Typography } from '../common/typography'
import { Avatar } from '../users/avatar'
import { Gallery } from './gallery'

export type Post =
  | RouterOutput['posts']['list']['posts'][number]
  | RouterOutput['posts']['get']

type Props = {
  disabled?: boolean
  post: Post
  style?: StyleProp<ViewStyle>
}

export const PostCard: FunctionComponent<Props> = ({
  disabled,
  post,
  style,
}) => {
  const router = useRouter()

  const t = useTranslations('component.posts.card')

  const intl = useIntl()

  const footer: Array<{
    icon: IconName
    iconColor?: TailwindColor
    label: string
  }> = useMemo(
    () =>
      compact([
        {
          icon: 'like',
          iconColor: post.likes.length > 0 ? 'primary-11' : undefined,
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
        post.type === 'item' && {
          icon: 'boxes',
          label: intl.formatNumber(post.meta.quantity ?? 1),
        },
        {
          icon: 'clock',
          label: intl.formatRelativeTime(post.createdAt),
        },
      ]),
    [intl, post]
  )

  return (
    <View style={[tw`gap-4`, style]}>
      <Pressable
        onPress={() => router.push(`/users/${post.user.id}`)}
        style={tw`flex-row items-center gap-2`}
      >
        <Avatar
          image={post.user.image}
          name={post.user.name}
          style={tw`h-6 w-6`}
        />

        <Typography lines={1} size="sm" style={tw`flex-1`} weight="medium">
          {post.user.name}
        </Typography>

        <View
          style={tw.style(
            'px-1 py-0.5 rounded',
            post.type === 'post'
              ? 'bg-lime-3'
              : post.type === 'item'
              ? 'bg-sky-3'
              : 'bg-amber-3'
          )}
        >
          <Typography
            color={
              post.type === 'post'
                ? 'lime-11'
                : post.type === 'item'
                ? 'sky-11'
                : 'amber-11'
            }
            size="xs"
            weight="medium"
          >
            {t(`type.${post.type}`)}
          </Typography>
        </View>
      </Pressable>

      <Pressable
        disabled={disabled}
        onPress={() => router.push(`/posts/${post.id}`)}
        style={tw`gap-4`}
      >
        {post.type === 'item' && (
          <View style={tw`flex-row gap-4`}>
            <Typography size="xl" style={tw`flex-1`} weight="medium">
              {post.meta.product}
            </Typography>

            {!!post.meta.price && (
              <Typography size="xl" weight="semibold">
                {intl.formatNumber(post.meta.price, {
                  currency: post.meta.currency,
                  style: 'currency',
                })}
              </Typography>
            )}
          </View>
        )}

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
