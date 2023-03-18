import { type InfiniteData } from '@tanstack/react-query'
import { produce } from 'immer'

import { queryClient, trpc } from '~/lib/trpc'
import { type ChatChannelView } from '~/schemas/chat/channel'

export const useChannelChecked = (channelId: string) => {
  const utils = trpc.useContext()

  const { mutate } = trpc.chat.markChecked.useMutation({
    onSuccess({ userId }) {
      utils.notifications.badge.invalidate()

      queryClient.setQueryData<
        InfiniteData<{
          data: Array<ChatChannelView>
          next?: number
        }>
      >(['channels'], (data) => {
        if (!data) {
          return data
        }

        return produce(data, (next) => {
          const pageIndex = next.pages.findIndex(
            ({ data }) => data.findIndex(({ id }) => id === channelId) >= 0
          )

          const channelIndex = next.pages[pageIndex]?.data.findIndex(
            ({ id }) => id === channelId
          )

          const member = next.pages[pageIndex]?.data[
            channelIndex
          ]?.members.find((member) => member.id === userId)

          if (member) {
            member.checkedAt = new Date()
          }
        })
      })
    },
  })

  return {
    markChecked: mutate,
  }
}
