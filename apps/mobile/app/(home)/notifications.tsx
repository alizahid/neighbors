import { FlashList } from '@shopify/flash-list'
import { useFocusEffect, useNavigation } from 'expo-router'
import { type FunctionComponent } from 'react'

import { IconButton } from '~/components/common/icon-button'
import { Refresher } from '~/components/common/refresher'
import { Separator } from '~/components/common/separator'
import { NotificationCard } from '~/components/notifications/card'
import { tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'

const Screen: FunctionComponent = () => {
  const navigation = useNavigation()

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

  useFocusEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          loading={markRead.isLoading}
          name="ok"
          onPress={() => markRead.mutate({})}
        />
      ),
    })
  })

  const data =
    notifications.data?.pages.flatMap(({ notifications }) => notifications) ??
    []

  return (
    <FlashList
      ItemSeparatorComponent={Separator}
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
