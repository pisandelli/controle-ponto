import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  const admin = await prisma.users.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@test.com',
      password: '123456'
    }
  })
  const pedro = await prisma.users.create({
    data: {
      name: 'Pedro',
      email: 'pedro@test.com',
      password: '123456'
    }
  })
  console.log({ admin, pedro })
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
