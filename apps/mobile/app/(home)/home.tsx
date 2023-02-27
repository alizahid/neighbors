import { FlashList } from '@shopify/flash-list'
import { type FunctionComponent } from 'react'
import { View } from 'react-native'

import { PostCard } from '~/components/posts/card'
import { useProfile } from '~/hooks/auth/profile'
import { tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'

const Screen: FunctionComponent = () => {
  const { profile } = useProfile()

  const buildingId = profile?.residencies.at(0)?.buildingId

  const posts = trpc.posts.list.useInfiniteQuery(
    {
      buildingId: buildingId!,
    },
    {
      enabled: !!buildingId,
      getNextPageParam: ({ next }) => next,
    }
  )

  const data = posts.data?.pages.flatMap(({ posts }) => posts) ?? []

  return (
    <FlashList
      ItemSeparatorComponent={() => <View style={tw`h-px bg-gray-6`} />}
      data={data}
      estimatedItemSize={200}
      onEndReached={() => {
        if (posts.hasNextPage) {
          posts.fetchNextPage()
        }
      }}
      renderItem={({ item }) => <PostCard post={item} style={tw`p-4`} />}
    />
  )
}

export default Screen
