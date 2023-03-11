import { useRouter } from 'expo-router'
import { produce } from 'immer'
import { type FunctionComponent, useCallback, useMemo } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useTranslations } from 'use-intl'

import { tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'
import { type RouterOutput } from '~/trpc/types'

import { Icon, type IconName } from '../common/icon'
import { Pressable } from '../common/pressable'
import { TimeAgo } from '../common/time-ago'
import { Typography } from '../common/typography'

export type NotificationCardItem =
  RouterOutput['notifications']['list']['notifications'][number]

type Props = {
  notification: NotificationCardItem
  style?: StyleProp<ViewStyle>
}

export const NotificationCard: FunctionComponent<Props> = ({
  notification,
  style,
}) => {
  const router = useRouter()

  const t = useTranslations('component.notifications.card')

  const utils = trpc.useContext()

  const markRead = trpc.notifications.markRead.useMutation({
    onSuccess() {
      utils.notifications.badge.invalidate()

      utils.notifications.list.setInfiniteData({}, (data) => {
        if (!data) {
          return data
        }

        return produce(data, (next) => {
          const pageIndex = next?.pages.findIndex(
            ({ notifications }) =>
              notifications.findIndex(({ id }) => id === notification.id) >= 0
          )

          const notificationIndex = next.pages[
            pageIndex
          ]?.notifications.findIndex(({ id }) => id === notification.id)

          const item = next.pages[pageIndex]?.notifications[notificationIndex]

          if (item) {
            item.readAt = new Date()
          }
        })
      })
    },
  })

  const [type, id] = notification.target.split(':')

  const icon: IconName = notification.type === 'comment' ? 'comment' : 'help'

  const copy = useMemo(
    () =>
      t.rich(notification.type, {
        medium: (text) => <Typography weight="medium">{text}</Typography>,
        type,
        user: notification.actor?.name,
      }),
    [notification, t, type]
  )

  const onPress = useCallback(() => {
    markRead.mutate({
      id: notification.id,
    })

    if (notification.type === 'comment') {
      router.push(`/posts/${id}`)
    }
  }, [id, markRead, notification, router])

  return (
    <Pressable
      onPress={onPress}
      style={[tw`flex-row items-center gap-2`, style]}
    >
      <Icon name={icon} />

      <View style={tw`flex-1`}>
        <Typography>{copy}</Typography>

        <Typography color="gray-11" size="sm">
          <TimeAgo>{notification.createdAt}</TimeAgo>
        </Typography>
      </View>

      {!notification.readAt && (
        <View style={tw`h-3 w-3 bg-primary-9 rounded-full`} />
      )}
    </Pressable>
  )
}
