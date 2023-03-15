import { zodResolver } from '@hookform/resolvers/zod'
import { Image } from 'expo-image'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslations } from 'use-intl'

import { useKeyboard } from '~/hooks/keyboard'
import { getImageUrl } from '~/lib/supabase'
import { getSpace, tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'
import { ChatSendSchema, type ChatSendView } from '~/schemas/chat/create'

import { Icon } from '../common/icon'
import { IconButton } from '../common/icon-button'
import { ImagePicker } from '../common/image-picker'
import { Input } from '../common/input'
import { Pressable } from '../common/pressable'

export type ChatReplyComponent = {
  focus: () => void
}

type Props = {
  channelId: string
  style?: StyleProp<ViewStyle>
}

// eslint-disable-next-line react/display-name
export const ChatReply = forwardRef<ChatReplyComponent, Props>(
  ({ channelId, style }, ref) => {
    const { bottom } = useSafeAreaInsets()

    const t = useTranslations('component.chat.reply')

    useImperativeHandle(ref, () => ({
      focus: () => setFocus('message'),
    }))

    const keyboard = useKeyboard()

    const [uploading, setUploading] = useState(false)

    const send = trpc.chat.send.useMutation({
      onSuccess() {
        reset()
      },
    })

    const {
      control,
      formState,
      handleSubmit,
      reset,
      setFocus,
      setValue,
      watch,
    } = useForm<ChatSendView>({
      defaultValues: {
        channelId,
        message: '',
        meta: {
          attachments: [],
        },
      },
      resolver: zodResolver(ChatSendSchema),
    })

    const onSubmit = handleSubmit((data) => {
      send.mutate(data)
    })

    const padding = keyboard.visible ? 0 : bottom
    const height = padding + getSpace(12)

    const { meta } = watch()

    return (
      <View style={[tw`border-t border-gray-7`, style]}>
        {meta.attachments.length > 0 && (
          <View style={tw`flex-row flex-wrap p-3 gap-3`}>
            {meta.attachments.map(({ url }, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  const next = meta.attachments.filter(
                    (image) => image.url !== url
                  )

                  setValue('meta.attachments', next)
                }}
              >
                <Image
                  source={getImageUrl(url)}
                  style={tw`h-12 w-12 rounded`}
                />

                <View
                  style={tw`absolute p-0.5 rounded-full bg-gray-3 -top-2 -right-2`}
                >
                  <Icon name="close" style={tw`h-3 w-3`} />
                </View>
              </Pressable>
            ))}
          </View>
        )}

        <View style={tw`flex-row`}>
          <Controller
            control={control}
            name="message"
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

          <Controller
            control={control}
            name="meta.attachments"
            render={({ field: { onChange, ref, value } }) => (
              <ImagePicker
                onChange={(value) =>
                  onChange(
                    value.map((url) => ({
                      type: 'image',
                      url,
                    }))
                  )
                }
                onUploading={setUploading}
                ref={ref}
                value={value.map(({ url }) => url)}
              >
                <IconButton
                  disabled={send.isLoading}
                  loading={uploading}
                  name="uploadImage"
                  onPress={() => setFocus('meta.attachments')}
                  style={tw`h-[${height}px] pb-[${padding}px]`}
                />
              </ImagePicker>
            )}
          />

          {formState.isValid && (
            <IconButton
              loading={send.isLoading}
              name="send"
              onPress={onSubmit}
              style={tw`h-[${height}px] pb-[${padding}px]`}
            />
          )}
        </View>
      </View>
    )
  }
)
