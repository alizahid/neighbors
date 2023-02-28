import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { type FunctionComponent } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useIntl } from 'use-intl'

import { getImageUrl } from '~/lib/supabase'
import { tw } from '~/lib/tailwind'
import { type RouterOutput } from '~/trpc/types'

import { Icon, type IconName } from '../common/icon'
import { Pressable } from '../common/pressable'
import { Typography } from '../common/typography'
import { Gallery } from '../posts/gallery'

type Props = {
  disabled?: boolean
  item:
    | RouterOutput['posts']['list']['posts'][number]
    | RouterOutput['posts']['get']
  style?: StyleProp<ViewStyle>
}

export const ItemCard: FunctionComponent<Props> = ({
  disabled,
  item,
  style,
}) => {
  const router = useRouter()

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
        <Image
          source={getImageUrl(item.user.image)}
          style={tw`bg-gray-3 h-6 w-6 rounded-full`}
        />

        <Typography lines={1} size="sm" style={tw`flex-1`} weight="medium">
          {item.user.name}
        </Typography>
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
