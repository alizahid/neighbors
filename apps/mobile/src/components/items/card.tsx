import { useRouter } from 'expo-router'
import { type FunctionComponent } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useIntl, useTranslations } from 'use-intl'

import { tw } from '~/lib/tailwind'

import { Icon, type IconName } from '../common/icon'
import { Pressable } from '../common/pressable'
import { Typography } from '../common/typography'
import { type Post } from '../posts/card'
import { Gallery } from '../posts/gallery'
import { Avatar } from '../users/avatar'

type Props = {
  disabled?: boolean
  item: Post
  style?: StyleProp<ViewStyle>
}

export const ItemCard: FunctionComponent<Props> = ({
  disabled,
  item,
  style,
}) => {
  const router = useRouter()

  const t = useTranslations('component.items.card')

  const intl = useIntl()

  const footer: Array<{
    icon: IconName
    label: string
  }> = [
    {
      icon: 'boxes',
      label: intl.formatNumber(item.meta.quantity ?? 1),
    },
    {
      icon: 'comment',
      label: intl.formatNumber(item._count.comments, {
        notation: 'compact',
      }),
    },
    {
      icon: 'clock',
      label: intl.formatRelativeTime(item.createdAt),
    },
  ]

  return (
    <View style={[tw`gap-4`, style]}>
      <Pressable
        onPress={() => router.push(`/users/${item.user.id}`)}
        style={tw`flex-row items-center gap-2`}
      >
        <Avatar
          image={item.user.image}
          name={item.user.name}
          style={tw`h-6 w-6`}
        />

        <Typography lines={1} size="sm" style={tw`flex-1`} weight="medium">
          {item.user.name}
        </Typography>

        <View style={tw`bg-sky-3 px-1 py-0.5 rounded`}>
          <Typography color="sky-11" size="xs" weight="medium">
            {t('type')}
          </Typography>
        </View>
      </Pressable>

      <Pressable
        disabled={disabled}
        onPress={() => router.push(`/posts/${item.id}`)}
        style={tw`gap-4`}
      >
        <View style={tw`flex-row gap-4`}>
          <Typography size="xl" style={tw`flex-1`} weight="medium">
            {item.meta.product}
          </Typography>

          {!!item.meta.price && (
            <Typography size="xl" weight="semibold">
              {intl.formatNumber(item.meta.price, {
                currency: item.meta.currency,
                style: 'currency',
              })}
            </Typography>
          )}
        </View>

        <Typography>{item.body}</Typography>

        <Gallery
          images={item.meta.attachments
            .filter(({ type }) => type === 'image')
            .map(({ url }) => url)}
          title={item.meta.product}
        />

        <View style={tw`flex-row gap-4`}>
          {footer.map(({ icon, label }, index) => (
            <View key={index} style={tw`flex-row items-center gap-1`}>
              <Icon color="gray-11" name={icon} style={tw`h-4 w-4`} />

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
