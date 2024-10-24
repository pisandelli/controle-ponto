import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  await prisma.timeLogs.create({
    data: {
      email: 'john@email.com',
      today: '01/09/2024',
      startTime: 1725177600,
      endTime: 1725210000,
      pausaInicio: 1725181200,
      pausaFim: 1725183000,
      pauseDuration: 1800,
      totalDuration: 27000,
      obsStart: 'Hoje cheguei no horário certo',
      obsEnd: 'Hoje saí do trabalho um pouco adiantado'
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
