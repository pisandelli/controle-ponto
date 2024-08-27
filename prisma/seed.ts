import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  const pedro = await prisma.users.create({
    data: {
      userId: '115452755645875412905',
      email: 'pedro@pisandelli.com',
      name: 'Pedro Pisandelli'
    }
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
