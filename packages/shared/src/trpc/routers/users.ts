import { type server } from '../index'

export const users = (t: typeof server) =>
  t.router({
    profile: t.procedure.query(({ ctx }) => {
      return ctx.user
    }),
  })
