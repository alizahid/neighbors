import { zodResolver } from '@hookform/resolvers/zod'
import { produce } from 'immer'
import { forwardRef, useImperativeHandle } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslations } from 'use-intl'

import { useKeyboard } from '~/hooks/keyboard'
import { getSpace, tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'
import {
  CommentCreateSchema,
  type CommentCreateView,
} from '~/schemas/comments/create'
import { useBuildingStore } from '~/stores/building'

import { IconButton } from '../common/icon-button'
import { Input } from '../common/input'

export type CommentFormComponent = {
  focus: () => void
}

type Props = {
  postId: string
  style?: StyleProp<ViewStyle>
}

// eslint-disable-next-line react/display-name
export const CommentForm = forwardRef<CommentFormComponent, Props>(
  ({ postId, style }, ref) => {
    const { bottom } = useSafeAreaInsets()

    const t = useTranslations('component.comments.form')

    const { buildingId } = useBuildingStore()

    useImperativeHandle(ref, () => ({
      focus: () => setFocus('body'),
    }))

    const keyboard = useKeyboard()

    const utils = trpc.useContext()

    const createComment = trpc.comments.create.useMutation({
      onSuccess(comment) {
        utils.comments.list.setData(
          {
            postId,
          },
          (data) => {
            if (!data) {
              return data
            }

            return produce(data, (next) => {
              next.comments.push(comment)
            })
          }
        )

        utils.posts.get.setData(
          {
            id: postId,
          },
          (data) => {
            if (!data) {
              return data
            }

            return produce(data, (next) => {
              next._count.comments += 1
            })
          }
        )

        if (buildingId) {
          utils.posts.list.setInfiniteData(
            {
              buildingId,
            },
            (data) => {
              if (!data) {
                return data
              }

              return produce(data, (next) => {
                const page = next?.pages.find(
                  ({ posts }) => posts.findIndex(({ id }) => id === postId) >= 0
                )

                const post = page?.posts.find(({ id }) => id === postId)

                if (post) {
                  post._count.comments += 1
                }
              })
            }
          )
        }

        reset()
      },
    })

    const { control, handleSubmit, reset, setFocus } =
      useForm<CommentCreateView>({
        defaultValues: {
          body: '',
          postId,
        },
        resolver: zodResolver(CommentCreateSchema),
      })

    const onSubmit = handleSubmit((data) => {
      keyboard.dismiss()

      return createComment.mutateAsync(data)
    })

    const padding = keyboard.visible ? 0 : bottom
    const height = padding + getSpace(12)

    return (
      <View style={[tw`flex-row border-t border-gray-7`, style]}>
        <Controller
          control={control}
          name="body"
          render={({ field: { onBlur, onChange, ref, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={onSubmit}
              placeholder={t('placeholder')}
              ref={ref}
              returnKeyType="go"
              style={tw`flex-1`}
              styleInput={tw`border-0 bg-transparent h-[${height}px] pb-[${padding}px]`}
              value={value}
            />
          )}
          rules={{
            required: true,
          }}
        />

        <IconButton
          loading={createComment.isLoading}
          name="send"
          onPress={onSubmit}
          style={tw`h-[${height}px] pb-[${padding}px]`}
        />
      </View>
    )
  }
)
