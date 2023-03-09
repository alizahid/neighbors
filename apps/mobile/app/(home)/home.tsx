import { FlashList } from '@shopify/flash-list'
import { useFocusEffect, useNavigation, useRouter } from 'expo-router'
import { type FunctionComponent } from 'react'
import { View } from 'react-native'
import { useTranslations } from 'use-intl'

import { BuildingPicker } from '~/components/buildings/picker'
import { Empty } from '~/components/common/empty'
import { IconButton } from '~/components/common/icon-button'
import { Refresher } from '~/components/common/refresher'
import { PostCard } from '~/components/posts/card'
import { tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'
import { useBuildingStore } from '~/stores/building'

const Screen: FunctionComponent = () => {
  const router = useRouter()
  const navigation = useNavigation()

  const t = useTranslations('screen.home')

  const { buildingId } = useBuildingStore()

  useFocusEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton name="add" onPress={() => router.push('/posts/new')} />
      ),
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
      ListEmptyComponent={() =>
        posts.isLoading ? null : (
          <Empty
            label={t('empty.label')}
            message={t('empty.message')}
            onPress={() => router.push('/posts/new')}
            title={t('empty.title')}
          />
        )
      }
      data={data}
      estimatedItemSize={200}
      onEndReached={() => {
        if (posts.hasNextPage) {
          posts.fetchNextPage()
        }
      }}
      refreshControl={<Refresher onRefresh={posts.refetch} />}
      renderItem={({ item }) => <PostCard post={item} style={tw`p-4`} />}
    />
  )
}

export default Screen
