import { FlashList } from '@shopify/flash-list'
import { useFocusEffect, useNavigation } from 'expo-router'
import { type FunctionComponent } from 'react'
import { View } from 'react-native'

import { BuildingPicker } from '~/components/buildings/picker'
import { PostCard } from '~/components/posts/card'
import { tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'
import { useBuildingStore } from '~/stores/building'

const Screen: FunctionComponent = () => {
  const navigation = useNavigation()

  const { buildingId } = useBuildingStore()

  useFocusEffect(() => {
    navigation.setOptions({
      headerTitle: () => <BuildingPicker />,
    })
  })

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
