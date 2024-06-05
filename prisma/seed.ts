import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  const admin = await prisma.users.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      email: 'admin@test.com',
      name: 'Admin',
      password: '123456'
    }
  })
  const pedro = await prisma.users.create({
    data: {
      email: 'pedro@test.com',
      name: 'Pedro',
      password: '123456'
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
