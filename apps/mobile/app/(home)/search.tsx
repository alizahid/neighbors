import { FlashList } from '@shopify/flash-list'
import { type FunctionComponent, useState } from 'react'
import { View } from 'react-native'
import { useDebounce } from 'use-debounce'
import { useTranslations } from 'use-intl'

import { Empty } from '~/components/common/empty'
import { IconButton } from '~/components/common/icon-button'
import { Input } from '~/components/common/input'
import { Loading } from '~/components/common/loading'
import { PostCard } from '~/components/posts/card'
import { tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'
import { useBuildingStore } from '~/stores/building'

const Screen: FunctionComponent = () => {
  const t = useTranslations('screen.search')

  const { buildingId } = useBuildingStore()

  const [text, setText] = useState('')

  const [query] = useDebounce(text, 500)

  const search = trpc.posts.list.useQuery(
    {
      buildingId: buildingId!,
      query,
    },
    {
      enabled: !!buildingId && query.length >= 3,
    }
  )

  const data = search.data?.posts ?? []

  return (
    <>
      <View style={tw`flex-row border-b border-gray-6`}>
        <Input
          onChangeText={setText}
          placeholder={t('placeholder')}
          style={tw`flex-1`}
          styleInput={tw`border-0 bg-transparent rounded-none`}
          value={text}
        />

        {query.length > 0 && (
          <IconButton name="close" onPress={() => setText('')} />
        )}
      </View>

      <FlashList
        ItemSeparatorComponent={() => <View style={tw`h-px bg-gray-6`} />}
        ListEmptyComponent={() =>
          search.isFetching ? (
            <Loading />
          ) : (
            <Empty
              title={t(`empty.title.${query.length < 3 ? 'input' : 'items'}`)}
            />
          )
        }
        contentContainerStyle={tw`pb-20`}
        data={data}
        estimatedItemSize={200}
        renderItem={({ item }) => (
          <PostCard likable={false} post={item} style={tw`p-4`} />
        )}
      />
    </>
  )
}

export default Screen
