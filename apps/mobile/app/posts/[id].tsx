import { FlashList } from '@shopify/flash-list'
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router'
import { type FunctionComponent, useRef } from 'react'
import { View } from 'react-native'
import { useTranslations } from 'use-intl'

import {
  COMMENT_CARD_HEIGHT,
  CommentCard,
  type CommentCardItem,
} from '~/components/comments/card'
import {
  CommentForm,
  type CommentFormComponent,
} from '~/components/comments/form'
import { Empty } from '~/components/common/empty'
import { IconButton } from '~/components/common/icon-button'
import { Loading } from '~/components/common/loading'
import { Typography } from '~/components/common/typography'
import { ItemCard } from '~/components/items/card'
import { PostCard } from '~/components/posts/card'
import { tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'

const Screen: FunctionComponent = () => {
  const t = useTranslations('screen.posts.post')

  const navigation = useNavigation()
  const params = useLocalSearchParams()

  const list = useRef<FlashList<CommentCardItem>>(null)
  const commentForm = useRef<CommentFormComponent>(null)

  const id = String(params.id)

  const post = trpc.posts.get.useQuery({
    id,
  })

  const comments = trpc.comments.list.useQuery({
    postId: id,
  })

  useFocusEffect(() => {
    navigation.setOptions({
      title: t(post.data ? `title.${post.data.type}` : 'title.loading'),
    })
  })

  if (post.isLoading || comments.isLoading) {
    return <Loading />
  }

  if (!post.data || !comments.data || post.data.type === 'ad') {
    return <Empty />
  }

  return (
    <View style={tw`flex-1 bg-gray-3`}>
      <FlashList
        ItemSeparatorComponent={() => <View style={tw`h-4`} />}
        ListEmptyComponent={() => <Empty message={t('comments.empty')} />}
        ListFooterComponent={() => (
          <CommentForm
            onComment={() => list.current?.scrollToEnd()}
            postId={id}
            ref={commentForm}
            style={tw`mt-4`}
          />
        )}
        ListFooterComponentStyle={tw`mt-auto`}
        ListHeaderComponent={
          <View>
            {post.data.type === 'item' ? (
              <ItemCard
                disabled
                item={post.data}
                style={tw`border-b border-gray-6 p-4`}
              />
            ) : (
              <PostCard
                disabled
                post={post.data}
                style={tw`border-b border-gray-6 p-4`}
              />
            )}

            <View style={tw`flex-row items-center justify-between`}>
              <Typography style={tw`mx-4`} weight="semibold">
                {t('comments.title', {
                  count: comments.data.length,
                })}
              </Typography>

              <IconButton
                name="add"
                onPress={() => commentForm.current?.focus()}
              />
            </View>
          </View>
        }
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={tw`bg-gray-1`}
        data={comments.data}
        estimatedItemSize={COMMENT_CARD_HEIGHT}
        keyboardShouldPersistTaps="handled"
        ref={list}
        renderItem={({ item }) => (
          <CommentCard comment={item} style={tw`mx-4`} />
        )}
      />
    </View>
  )
}

export default Screen
