import { type NotificationTypeView } from '~/schemas/notifications/type'
import { type PostTypeView } from '~/schemas/posts/type'
import { type UserView } from '~/schemas/users'

import { translator } from './intl'

export type Target = `${PostTypeView}:${string}`

export const combineTarget = (type: PostTypeView, id: string): Target =>
  `${type}:${id}`

export const splitTarget = (target: Target) => {
  const [type, id] = target.split(':')

  return {
    id,
    type: type as PostTypeView,
  }
}

const list = new Intl.ListFormat('en')

export const formatBody = (
  type: NotificationTypeView,
  target: PostTypeView,
  actors: Array<UserView>
) => {
  let users = actors.map(({ name }) => name)

  if (users.length > 2) {
    users = users.slice(0, 2)

    users.push(translator('component.notifications.card.others'))
  }

  return translator(`component.notifications.card.${type}`, {
    type: target,
    users: list.format(users),
  })
}
