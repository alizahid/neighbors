import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { addMinutes, subMinutes } from 'date-fns'
import { merge, range, sample } from 'lodash-es'

const prisma = new PrismaClient()

const main = async () => {
  const aliEmail = 'ali.zahid@live.com'
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

  await prisma.like.deleteMany({})
  await prisma.comment.deleteMany({})
  await prisma.post.deleteMany({})
  await prisma.resident.deleteMany({})

  await prisma.user.deleteMany({
    where: {
      email: {
        not: aliEmail,
      },
    },
  })

  await prisma.resident.create({
    data: {
      building: {
        connect: {
          id: buildingId,
        },
      },
      user: {
        connect: {
          email: aliEmail,
        },
      },
    },
  })

  const users = range(200).map(() => faker.datatype.uuid())

  await Promise.all(
    users.map((id) =>
      prisma.user.create({
        data: {
          createdAt: subMinutes(new Date(), faker.datatype.number(200_000)),
          email: faker.internet.email().toLowerCase(),
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

  const ali = await prisma.user.findUnique({
    where: {
      email: aliEmail,
    },
  })

  if (ali) {
    users.push(ali.id)
  }

  await prisma.post.createMany({
    data: range(1_200).map(() => {
      const type = faker.datatype.number(100) > 75 ? 'item' : 'post'

      const meta = merge(
        {
          attachments:
            type === 'item' || faker.datatype.number(100) > 90
              ? range(faker.datatype.number(5)).map(() => ({
                  type: 'image',
                  url: faker.image.food(800, 600, true),
                }))
              : [],
        },
        type === 'item'
          ? {
              currency: 'AED',
              price: Number(faker.commerce.price()),
              product: faker.commerce.productName(),
              quantity: faker.datatype.number(5),
            }
          : {}
      )

      return {
        body:
          type === 'item'
            ? faker.commerce.productDescription()
            : faker.lorem.paragraph(),
        buildingId,
        createdAt: subMinutes(new Date(), faker.datatype.number(100_000)),
        meta,
        type,
        userId: String(sample(users)),
      }
    }),
  })

  const posts = await prisma.post.findMany({
    select: {
      createdAt: true,
      id: true,
    },
  })

  await prisma.comment.createMany({
    data: posts.flatMap(({ createdAt, id }) =>
      range(faker.datatype.number(5)).map(() => ({
        body: faker.lorem.sentence(),
        createdAt: addMinutes(createdAt, faker.datatype.number(10_000)),
        postId: id,
        userId: String(sample(users)),
      }))
    ),
  })

  await prisma.like.createMany({
    data: posts.flatMap(({ createdAt, id }) =>
      range(faker.datatype.number(5)).map(() => ({
        createdAt: addMinutes(createdAt, faker.datatype.number(10_000)),
        postId: id,
        userId: String(sample(users)),
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
