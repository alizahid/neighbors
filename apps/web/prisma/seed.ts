import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { addMinutes, subMinutes } from 'date-fns'
import { merge, range, sample } from 'lodash-es'

const prisma = new PrismaClient()

const main = async () => {
  const ali = await prisma.user.upsert({
    create: {
      email: 'ali.zahid@live.com',
      id: '671f2d02-a209-48c2-b5e1-4c103f995fda',
      image: 'https://media.graphassets.com/GJrB3pURnqRlaj61Z3Qp',
      meta: {
        bio: 'Founder of nearbuds',
      },
      name: 'Ali Zahid',
    },
    update: {},
    where: {
      email: 'ali.zahid@live.com',
    },
  })

  const amna = await prisma.building.upsert({
    create: {
      area: 'Business Bay',
      city: 'Dubai',
      id: '2423786279',
      name: 'Amna Tower',
    },
    update: {},
    where: {
      id: '2423786279',
    },
  })

  const ag = await prisma.building.upsert({
    create: {
      area: 'Canal Road',
      city: 'Faisalabad',
      id: 'agfsd',
      name: 'Abdullah Gardens',
    },
    update: {},
    where: {
      id: 'agfsd',
    },
  })

  await prisma.like.deleteMany({})
  await prisma.comment.deleteMany({})
  await prisma.post.deleteMany({})
  await prisma.resident.deleteMany({})

  await prisma.user.deleteMany({
    where: {
      email: {
        not: ali.email,
      },
    },
  })

  await prisma.resident.create({
    data: {
      building: {
        connect: {
          id: amna.id,
        },
      },
      user: {
        connect: {
          email: ali.email,
        },
      },
    },
  })

  await prisma.resident.create({
    data: {
      building: {
        connect: {
          id: ag.id,
        },
      },
      user: {
        connect: {
          email: ali.email,
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
              buildingId: amna.id,
            },
          },
        },
      })
    )
  )

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
              price: Number(faker.commerce.price(1)),
              product: faker.commerce.productName(),
              quantity: faker.datatype.number({
                max: 5,
                min: 1,
              }),
            }
          : {}
      )

      return {
        body:
          type === 'item'
            ? faker.commerce.productDescription()
            : faker.lorem.paragraph(),
        buildingId: amna.id,
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
        createdAt: addMinutes(createdAt, faker.datatype.number(1_000)),
        postId: id,
        userId: String(sample(users)),
      }))
    ),
  })

  await prisma.like.createMany({
    data: posts.flatMap(({ createdAt, id }) =>
      range(faker.datatype.number(5)).map(() => ({
        createdAt: addMinutes(createdAt, faker.datatype.number(1_000)),
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
