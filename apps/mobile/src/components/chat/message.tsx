import { type FunctionComponent } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useIntl } from 'use-intl'

import { tw } from '~/lib/tailwind'
import { type ChatMessageView } from '~/schemas/chat/message'

import { Typography } from '../common/typography'
import { Avatar } from '../users/avatar'

type Props = {
  message: ChatMessageView
  style?: StyleProp<ViewStyle>
  userId?: string
}

export const ChatMessage: FunctionComponent<Props> = ({
  message,
  style,
  userId,
}) => {
  const intl = useIntl()

  const mine = message.user.id === userId

  return (
    <View
      style={[
        tw.style(
          'gap-2 items-center w-2/3',
          mine ? 'flex-row-reverse self-end' : 'flex-row'
        ),
        style,
      ]}
    >
      {!mine && (
        <Avatar
          image={message.user.image}
          name={message.user.name}
          style={tw`h-6 w-6 bg-gray-9`}
        />
      )}

      <View style={tw.style('flex-1', mine ? 'items-end' : 'items-start')}>
        <View
          style={tw.style(
            'rounded-lg px-2 py-1',
            mine ? 'bg-primary-9' : 'bg-accent-9'
          )}
        >
          <Typography color="gray-1">{message.body}</Typography>
        </View>

        <Typography color="gray-11" size="xs" style={tw`mt-1`}>
          {intl.formatDateTime(message.createdAt, {
            timeStyle: 'short',
          })}
        </Typography>
      </View>
    </View>
  )
}
