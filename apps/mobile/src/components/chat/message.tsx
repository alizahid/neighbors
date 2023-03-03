import { type FunctionComponent } from 'react'
import { type StyleProp, View, type ViewStyle } from 'react-native'
import { useIntl } from 'use-intl'

import { tw } from '~/lib/tailwind'
import { type ChatMessageView } from '~/schemas/chat/message'

import { Typography } from '../common/typography'
import { Avatar } from '../users/avatar'

type Props = {
  first?: boolean
  last?: boolean
  message: ChatMessageView
  style?: StyleProp<ViewStyle>
  userId?: string
}

export const ChatMessage: FunctionComponent<Props> = ({
  first,
  last,
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
          'gap-2 items-end w-2/3',
          mine ? 'flex-row-reverse self-end' : 'flex-row',
          !first &&
            !last &&
            (message.grouping === 'single' || message.grouping === 'top')
            ? 'mt-4'
            : 'mt-1'
        ),
        style,
      ]}
    >
      {!mine &&
        (message.grouping === 'single' || message.grouping === 'bottom') && (
          <Avatar
            image={message.user.image}
            name={message.user.name}
            style={tw`h-6 w-6 mb-5`}
          />
        )}

      <View
        style={tw.style(
          'flex-1',
          mine ? 'items-end' : 'items-start',
          !mine &&
            message.grouping !== 'single' &&
            message.grouping !== 'bottom' &&
            'ml-8'
        )}
      >
        <View
          style={tw.style(
            'px-2 py-1',
            mine ? 'bg-primary-9' : 'bg-accent-9',
            message.grouping === 'single' && 'rounded-lg',
            message.grouping === 'top' && 'rounded-t-lg rounded-b',
            message.grouping === 'middle' && 'rounded',
            message.grouping === 'bottom' && 'rounded-b-lg rounded-t'
          )}
        >
          <Typography color="gray-1">{message.body}</Typography>
        </View>

        {(message.grouping === 'single' || message.grouping === 'bottom') && (
          <Typography color="gray-11" size="xs" style={tw`mt-1`}>
            {intl.formatDateTime(message.createdAt, {
              timeStyle: 'short',
            })}
          </Typography>
        )}
      </View>
    </View>
  )
}