import { FlashList } from '@shopify/flash-list'
import { useNavigation } from 'expo-router'
import { type FunctionComponent, useEffect, useMemo } from 'react'
import { useTranslations } from 'use-intl'

import { Empty } from '~/components/common/empty'
import { IconButton } from '~/components/common/icon-button'
import { Refresher } from '~/components/common/refresher'
import { Separator } from '~/components/common/separator'
import { NotificationCard } from '~/components/notifications/card'
import { tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'

const Screen: FunctionComponent = () => {
  const navigation = useNavigation()

  const t = useTranslations('screen.notifications')

  const utils = trpc.useContext()

  const notifications = trpc.notifications.list.useInfiniteQuery(
    {},
    {
      getNextPageParam: ({ next }) => next,
    }
  )

  const markRead = trpc.notifications.markRead.useMutation({
    onSuccess() {
      utils.notifications.badge.invalidate()

      utils.notifications.list.invalidate()
    },
  })

  const data = useMemo(
    () =>
      notifications.data?.pages.flatMap(({ notifications }) => notifications) ??
      [],
    [notifications.data?.pages]
  )

  useEffect(() => {
    const unread = data.filter(({ readAt }) => readAt === null).length

    if (unread === 0) {
      return
    }

    navigation.setOptions({
      headerRight: () => (
        <IconButton
          loading={markRead.isLoading}
          name="ok"
          onPress={() => markRead.mutate({})}
        />
      ),
    })
  }, [data, markRead, navigation])

  return (
    <FlashList
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={() =>
        notifications.isLoading ? null : <Empty title={t('empty')} />
      }
      data={data}
      estimatedItemSize={100}
      onEndReached={() => {
        if (notifications.hasNextPage) {
          notifications.fetchNextPage()
        }
      }}
      refreshControl={<Refresher onRefresh={notifications.refetch} />}
      renderItem={({ item }) => (
        <NotificationCard notification={item} style={tw`p-4`} />
      )}
    />
  )
}

export default Screen
