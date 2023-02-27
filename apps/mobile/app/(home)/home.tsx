import { FlashList } from '@shopify/flash-list'
import { useRouter } from 'expo-router'
import { type FunctionComponent } from 'react'
import { View } from 'react-native'

import { Pressable } from '~/components/common/pressable'
import { PostCard } from '~/components/posts/card'
import { useProfile } from '~/hooks/auth/profile'
import { tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'

const Screen: FunctionComponent = () => {
  const router = useRouter()

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
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/posts/${item.id}`)}>
          <PostCard post={item} style={tw`p-4`} />
        </Pressable>
      )}
    />
  )
}

export default Screen
