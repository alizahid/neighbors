import { FlashList } from '@shopify/flash-list'
import { useFocusEffect, useNavigation } from 'expo-router'
import { type FunctionComponent } from 'react'
import { View } from 'react-native'
import { useTranslations } from 'use-intl'

import { BuildingPicker } from '~/components/buildings/picker'
import { Empty } from '~/components/common/empty'
import { Refresher } from '~/components/common/refresher'
import { ItemCard } from '~/components/items/card'
import { tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'
import { useBuildingStore } from '~/stores/building'

const Screen: FunctionComponent = () => {
  const navigation = useNavigation()

  const t = useTranslations('screen.home.market')

  const { buildingId } = useBuildingStore()

  useFocusEffect(() => {
    navigation.setOptions({
      headerTitle: () => <BuildingPicker />,
    })
  })

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
      ListEmptyComponent={() =>
        items.isLoading ? null : (
          <Empty
            label={t('empty.label')}
            message={t('empty.message')}
            title={t('empty.title')}
          />
        )
      }
      data={data}
      estimatedItemSize={200}
      onEndReached={() => {
        if (items.hasNextPage) {
          items.fetchNextPage()
        }
      }}
      refreshControl={
        <Refresher
          onRefresh={() => items.refetch()}
          refreshing={items.isLoading}
        />
      }
      renderItem={({ item }) => <ItemCard item={item} style={tw`p-4`} />}
    />
  )
}

export default Screen
