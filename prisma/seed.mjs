import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  await prisma.users.create({
    data: [
      {
        name: 'Pedro',
        email: 'pedro@test.com',
        password: '123456'
      },
      {
        name: 'Isadora',
        email: 'isadora@test.com',
        password: '123456'
      }
    ]
  })
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
