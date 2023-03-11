import { FlashList } from '@shopify/flash-list'
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from 'expo-router'
import { type FunctionComponent, useEffect, useRef } from 'react'
import { View } from 'react-native'
import { useTranslations } from 'use-intl'

import { CommentCard, type CommentCardItem } from '~/components/comments/card'
import {
  CommentForm,
  type CommentFormComponent,
} from '~/components/comments/form'
import { Empty } from '~/components/common/empty'
import { IconButton } from '~/components/common/icon-button'
import { Loading } from '~/components/common/loading'
import { Refresher } from '~/components/common/refresher'
import { Separator } from '~/components/common/separator'
import { Typography } from '~/components/common/typography'
import { PostCard } from '~/components/posts/card'
import { useProfile } from '~/hooks/auth/profile'
import { tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'

const Screen: FunctionComponent = () => {
  const t = useTranslations('screen.posts.post')

  const router = useRouter()
  const navigation = useNavigation()
  const params = useLocalSearchParams()

  const list = useRef<FlashList<CommentCardItem>>(null)
  const commentForm = useRef<CommentFormComponent>(null)

  const id = String(params.id)

  const { profile } = useProfile()

  const post = trpc.posts.get.useQuery({
    id,
  })

  const comments = trpc.comments.list.useQuery({
    postId: id,
  })

  const startChat = trpc.chat.start.useMutation({
    onSuccess(id) {
      router.push(`/chat/${id}`)
    },
  })

  useFocusEffect(() => {
    navigation.setOptions({
      title: t(post.data ? `title.${post.data.type}` : 'title.loading'),
    })
  })

  useEffect(() => {
    if (!profile || !post.data || profile.id === post.data.user.id) {
      return
    }

    navigation.setOptions({
      headerRight: () => (
        <IconButton
          loading={startChat.isLoading}
          name="startChat"
          onPress={() =>
            startChat.mutate({
              userId: post.data.user.id,
            })
          }
        />
      ),
    })
  }, [navigation, post.data, profile, startChat])

  if (post.isLoading || comments.isLoading) {
    return <Loading />
  }

  if (!post.data || !comments.data) {
    return <Empty />
  }

  return (
    <>
      <FlashList
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={() => <Empty title={t('comments.empty')} />}
        ListHeaderComponent={
          <View>
            <PostCard
              disabled
              post={post.data}
              style={tw`border-b border-gray-6 p-4`}
            />

            <View style={tw`flex-row items-center justify-between`}>
              <Typography style={tw`mx-4`} weight="semibold">
                {t('comments.title', {
                  count: comments.data.comments.length,
                })}
              </Typography>

              <IconButton
                name="add"
                onPress={() => commentForm.current?.focus()}
              />
            </View>
          </View>
        }
        contentContainerStyle={tw`pb-4`}
        data={comments.data.comments}
        estimatedItemSize={44}
        keyboardShouldPersistTaps="handled"
        ref={list}
        refreshControl={
          <Refresher
            onRefresh={() => Promise.all([post.refetch(), comments.refetch()])}
          />
        }
        renderItem={({ item }) => (
          <CommentCard comment={item} style={tw`mx-4`} />
        )}
      />

      <CommentForm postId={id} ref={commentForm} />
    </>
  )
}

export default Screen
