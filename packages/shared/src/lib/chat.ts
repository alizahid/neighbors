import { type ChatMessageView } from '~/schemas/chat/message'

export const groupMessages = (
  messages: Array<ChatMessageView>
): Array<ChatMessageView> =>
  messages.map((message, index) => {
    const next = messages[index - 1]
    const prev = messages[index + 1]

    const userId = message.user.id

    const single = prev?.user.id !== userId && next?.user.id !== userId
    const top = !single && prev?.user.id !== userId
    const bottom = !single && next?.user.id !== userId
    const middle = !single && !top && !bottom

    const grouping: ChatMessageView['grouping'] = single
      ? 'single'
      : top
      ? 'top'
      : middle
      ? 'middle'
      : bottom
      ? 'bottom'
      : undefined

    return {
      ...message,
      grouping,
    }
  })
