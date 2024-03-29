import { type ExpoPushMessage } from 'expo-server-sdk'

import { type NotificationTypeView } from '~/schemas/notifications/type'

import { expo } from './expo'
import { translator } from './intl'
import { splitTarget, type Target } from './notifications'
import { db } from './prisma'

export const getBadge = async (userId: string) => {
  const channels = await db.channel.findMany({
    include: {
      members: {
        where: {
          userId,
        },
      },
    },
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
  })

  const chat = channels.filter(
    ({ members, updatedAt }) =>
      !members[0].checkedAt || updatedAt > members[0].checkedAt
  ).length

  const notifications = await db.notification.count({
    where: {
      read: false,
      userId,
    },
  })

  return {
    chat,
    notifications,
  }
}

export const sendNotification = async ({
  actorId,
  buildingId,
  target,
  type,
  userId,
}: {
  actorId: string
  buildingId: string
  target: Target
  type: NotificationTypeView
  userId: string
}) => {
  const exists = await db.notification.findFirst({
    where: {
      buildingId,
      target,
      type,
      userId,
    },
  })

  if (exists) {
    await db.notification.update({
      data: {
        actors: {
          push: actorId,
        },
      },
      where: {
        id: exists?.id,
      },
    })
  } else {
    await db.notification.create({
      data: {
        actors: [actorId],
        buildingId,
        target,
        type,
        userId,
      },
    })
  }

  if (process.env.NODE_ENV === 'production') {
    const { id, type: targetType } = splitTarget(target)

    const user = await db.user.findUnique({
      where: {
        id: actorId,
      },
    })

    await sendPush(userId, {
      body: translator(`api.push.${type}.body`, {
        type: targetType,
        user: user?.name ?? translator('api.push.someone'),
      }),
      title: translator(`api.push.${type}.title`, {
        type: targetType,
        user: user?.name ?? translator('api.push.someone'),
      }),
      url: `/posts/${id}`,
    })
  }
}

export const sendPush = async (
  userId: string,
  {
    body,
    title,
    url,
  }: {
    body: string
    title: string
    url: string
  }
) => {
  const { chat, notifications } = await getBadge(userId)

  const devices = await db.device.findMany({
    where: {
      userId,
    },
  })

  const messages: Array<ExpoPushMessage> = devices.map(({ token }) => ({
    badge: chat + notifications,
    body,
    data: {
      url,
    },
    title,
    to: token,
  }))

  await expo.sendPushNotificationsAsync(messages)
}
