import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.tag.createMany({
    data: [
      { name: 'next.js' },
      { name: 'C#' },
      { name: 'Go' },
    ],
    skipDuplicates: true,
  })

  const tagGo = await prisma.tag.findUnique({ where: { name: 'Go' } })
  const tagCSharp = await prisma.tag.findUnique({ where: { name: 'C#' } })
  const tagNext = await prisma.tag.findUnique({ where: { name: 'next.js' } })

  // Alice with one task (due to 1-to-1 relation)
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@mobup.inc',
      tasks: {
        create: {
          title: 'Join the Prisma Discord',
          summary: 'https://pris.ly/discord',
          tags: {
            connect: [
              { id: tagGo?.id || 0 },
              { id: tagNext?.id || 0 },
            ],
          },
        },
      },
    },
  })

  // Bob with one task
  await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@mobup.inc',
      tasks: {
        create: {
          title: 'Follow Prisma on Twitter',
          summary: 'https://www.twitter.com/prisma',
          tags: {
            connect: [{ id: tagCSharp?.id || 0 }],
          },
        },
      },
    },
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })

