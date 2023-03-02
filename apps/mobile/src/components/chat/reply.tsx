import { zodResolver } from '@hookform/resolvers/zod'
import { forwardRef, useImperativeHandle } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTranslations } from 'use-intl'

import { useKeyboard } from '~/hooks/keyboard'
import { getSpace, tw } from '~/lib/tailwind'
import { trpc } from '~/lib/trpc'
import { ChatSendSchema, type ChatSendView } from '~/schemas/chat/create'

import { IconButton } from '../common/icon-button'
import { Input } from '../common/input'

export type ChatReplyComponent = {
  focus: () => void
}

type Props = {
  channelId: string
  disabled?: boolean
  style?: StyleProp<ViewStyle>

  onReply?: () => void
}

// eslint-disable-next-line react/display-name
export const ChatReply = forwardRef<ChatReplyComponent, Props>(
  ({ channelId, disabled, onReply, style }, ref) => {
    const { bottom } = useSafeAreaInsets()

    const t = useTranslations('component.chat.reply')

    useImperativeHandle(ref, () => ({
      focus: () => setFocus('message'),
    }))

    const keyboard = useKeyboard()

    const send = trpc.chat.send.useMutation({
      onSuccess() {
        setValue('message', '')

        onReply?.()
      },
    })

    const { control, handleSubmit, setFocus, setValue } = useForm<ChatSendView>(
      {
        defaultValues: {
          channelId,
          message: '',
        },
        resolver: zodResolver(ChatSendSchema),
      }
    )

    const onSubmit = handleSubmit((data) => {
      keyboard.dismiss()

      return send.mutateAsync(data)
    })

    const padding = keyboard.visible ? 0 : bottom
    const height = padding + getSpace(12)

    return (
      <View style={[tw`flex-row border-t border-gray-7`, style]}>
        <Controller
          control={control}
          name="message"
          render={({ field: { onBlur, onChange, ref, value } }) => (
            <Input
              editable={!disabled}
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
          disabled={disabled}
          loading={send.isLoading}
          name="send"
          onPress={onSubmit}
          style={tw`h-[${height}px] pb-[${padding}px]`}
        />
      </View>
    )
  }
)
