import { type NextApiHandler } from 'next'

import { db } from '~/lib/prisma'

const handler: NextApiHandler = async (req, res) => {
  const [data] = await db.$queryRaw<
    [
      {
        status: 'ok'
      }
    ]
  >`SELECT 'ok' as status`

  res.json(data)
}

export default handler
