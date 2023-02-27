import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { range, sample } from 'lodash-es'

const prisma = new PrismaClient()

const main = async () => {
  const buildingId = '2423786279'

  const building = await prisma.building.upsert({
    create: {
      area: 'Business Bay',
      city: 'Dubai',
      id: buildingId,
      name: 'Amna Tower',
    },
    update: {},
    where: {
      id: buildingId,
    },
  })

  const users = range(200).map(() => faker.datatype.uuid())

  await Promise.all(
    users.map((id) =>
      prisma.user.create({
        data: {
          email: faker.internet.email(),
          id,
          image: faker.image.people(800, 800, true),
          name: `${faker.name.firstName()} ${faker.name.lastName()}`,
          residencies: {
            create: {
              buildingId: building.id,
            },
          },
        },
      })
    )
  )

  await prisma.post.createMany({
    data: range(1_000).map(() => ({
      attachments:
        faker.datatype.number(100) > 90
          ? range(faker.datatype.number(5)).map(() =>
              faker.image.food(800, 600, true)
            )
          : [],
      body: faker.lorem.paragraph(),
      buildingId,
      userId: sample(users) as string,
    })),
  })

  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  })

  await prisma.comment.createMany({
    data: posts.flatMap(() =>
      range(faker.datatype.number(5)).map(() => ({
        body: faker.lorem.sentence(),
        postId: sample(posts)?.id as string,
        userId: sample(users) as string,
      }))
    ),
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)

    await prisma.$disconnect()

    process.exit(1)
  })
