import { FlashList } from '@shopify/flash-list'
import { type FunctionComponent } from 'react'
import { View } from 'react-native'

import { ItemCard } from '~/components/items/card'
import { useProfile } from '~/hooks/auth/profile'
import { tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'

const Screen: FunctionComponent = () => {
  const { profile } = useProfile()

  const buildingId = profile?.residencies.at(0)?.buildingId

  const items = trpc.market.items.useInfiniteQuery(
    {
      buildingId: buildingId!,
    },
    {
      enabled: !!buildingId,
      getNextPageParam: ({ next }) => next,
    }
  )

  const data = items.data?.pages.flatMap(({ items }) => items) ?? []

  return (
    <FlashList
      ItemSeparatorComponent={() => <View style={tw`h-px bg-gray-6`} />}
      data={data}
      estimatedItemSize={200}
      onEndReached={() => {
        if (items.hasNextPage) {
          items.fetchNextPage()
        }
      }}
      renderItem={({ item }) => <ItemCard item={item} style={tw`p-4`} />}
    />
  )
}

export default Screen
