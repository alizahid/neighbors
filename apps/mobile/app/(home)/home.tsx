import { FlashList } from '@shopify/flash-list'
import { useFocusEffect, useNavigation, useRouter } from 'expo-router'
import { type FunctionComponent } from 'react'
import { useTranslations } from 'use-intl'

import { BuildingPicker } from '~/components/buildings/picker'
import { Empty } from '~/components/common/empty'
import { IconButton } from '~/components/common/icon-button'
import { Refresher } from '~/components/common/refresher'
import { Separator } from '~/components/common/separator'
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
    <>
      <FlashList
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={() =>
          posts.isLoading ? null : (
            <Empty message={t('empty.message')} title={t('empty.title')} />
          )
        }
        contentContainerStyle={tw`pb-20`}
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

      <IconButton
        color="gray-1"
        name="plus"
        onPress={() => router.push('/posts/new')}
        style={tw`absolute bottom-4 right-4 bg-primary-12 rounded-full`}
      />
    </>
  )
}

export default Screen
