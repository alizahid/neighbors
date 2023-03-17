import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
import { addMinutes, formatISO, subMinutes } from 'date-fns'
import { merge, range, sample } from 'lodash-es'

const prisma = new PrismaClient()

const main = async () => {
  await prisma.like.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.message.deleteMany()
  await prisma.member.deleteMany()
  await prisma.channel.deleteMany()
  await prisma.resident.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.building.deleteMany()
  await prisma.user.deleteMany()

  const ali = await prisma.user.create({
    data: {
      email: 'ali.zahid@live.com',
      id: '8d202ad2-9530-4de8-9e7e-ab3c1192c1b2',
      image: 'https://media.graphassets.com/GJrB3pURnqRlaj61Z3Qp',
      meta: {
        bio: 'Founder of nearbuds',
      },
      name: 'Ali Zahid',
    },
  })

  const janet = await prisma.user.create({
    data: {
      email: 'hi@janetpaul.com',
      id: '66b02752-7e66-4faf-84ed-8222149a2730',
      name: 'Janet Paul',
    },
  })

  const amna = await prisma.building.create({
    data: {
      area: 'Business Bay',
      city: 'Dubai',
      id: '2423786279',
      name: 'Amna Tower',
      type: 'apartment',
    },
  })

  const ag = await prisma.building.create({
    data: {
      area: 'Canal Road',
      city: 'Faisalabad',
      id: 'agfsd',
      name: 'Abdullah Gardens',
      type: 'community',
    },
  })

  await prisma.resident.createMany({
    data: [
      {
        buildingId: amna.id,
        userId: ali.id,
      },
      {
        buildingId: ag.id,
        userId: ali.id,
      },
      {
        buildingId: amna.id,
        userId: janet.id,
      },
      {
        buildingId: ag.id,
        userId: janet.id,
      },
    ],
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
      const random = faker.datatype.number(100)

      const type = random > 80 ? 'item' : random > 60 ? 'event' : 'post'

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
          : {},
        type === 'event'
          ? {
              date: formatISO(
                addMinutes(new Date(), faker.datatype.number(10_000))
              ),
              event: faker.animal.cat(),
              rsvp: [],
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

  await prisma.channel.create({
    data: {
      members: {
        createMany: {
          data: [
            {
              userId: ali.id,
            },
            {
              userId: janet.id,
            },
          ],
        },
      },
      message: 'Nice!',
      messages: {
        createMany: {
          data: [
            ...range(300).map(() => ({
              body: faker.lorem.sentence(),
              createdAt: subMinutes(new Date(), faker.datatype.number(10_000)),
              userId: String(sample([ali.id, janet.id])),
            })),
            {
              body: 'Nice!',
              userId: ali.id,
            },
          ],
        },
      },
    },
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
