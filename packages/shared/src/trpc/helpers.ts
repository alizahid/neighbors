import { TRPCError } from '@trpc/server'

import { type Context } from './context'

type WithUser = Omit<Context, 'user'> & {
  user: NonNullable<Context['user']>
}

export function isLoggedIn(context: Context): asserts context is WithUser {
  if (!context.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    })
  }
}

export function isNotNull<Item>(
  item: Item | null
): asserts item is NonNullable<Item> {
  if (item === null) {
    throw new TRPCError({
      code: 'NOT_FOUND',
    })
  }
}
