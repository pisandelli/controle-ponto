import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const bulk = [
  {
    email: 'john@email.com',
    today: '01/10/2024',
    month: '10',
    year: '2024',
    startTime: 1725177600,
    endTime: 1725210000,
    pausaInicio: 1725181200,
    pausaFim: 1725183000,
    pauseDuration: 1800,
    totalDuration: 27000,
    obsStart: 'Hoje cheguei no horário certo',
    obsEnd: 'Hoje saí do trabalho um pouco adiantado'
  },
  {
    email: 'john@email.com',
    today: '02/10/2024',
    month: '10',
    year: '2024',
    startTime: 1725177600,
    endTime: 1725210000,
    pausaInicio: 1725181200,
    pausaFim: 1725183000,
    pauseDuration: 1800,
    totalDuration: 27000,
    obsStart: 'Hoje cheguei no horário certo',
    obsEnd: 'Hoje saí do trabalho um pouco adiantado'
  },
  {
    email: 'john@email.com',
    today: '03/10/2024',
    month: '10',
    year: '2024',
    startTime: 1725177600,
    endTime: 1725210000,
    pausaInicio: 1725181200,
    pausaFim: 1725183000,
    pauseDuration: 1800,
    totalDuration: 27000,
    obsStart: 'Hoje cheguei no horário certo',
    obsEnd: 'Hoje saí do trabalho um pouco adiantado'
  },
  {
    email: 'john@email.com',
    today: '04/10/2024',
    month: '10',
    year: '2024',
    startTime: 1725177600,
    endTime: 1725210000,
    pausaInicio: 1725181200,
    pausaFim: 1725183000,
    pauseDuration: 1800,
    totalDuration: 27000,
    obsStart: 'Hoje cheguei no horário certo',
    obsEnd: 'Hoje saí do trabalho um pouco adiantado'
  },
  {
    email: 'john@email.com',
    today: '05/10/2024',
    month: '10',
    year: '2024',
    startTime: 1725177600,
    endTime: 1725210000,
    pausaInicio: 1725181200,
    pausaFim: 1725183000,
    pauseDuration: 1800,
    totalDuration: 27000,
    obsStart: 'Hoje cheguei no horário certo',
    obsEnd: 'Hoje saí do trabalho um pouco adiantado'
  },
  {
    email: 'john@email.com',
    today: '06/10/2024',
    month: '10',
    year: '2024',
    startTime: 1725177600,
    endTime: 1725210000,
    pausaInicio: 1725181200,
    pausaFim: 1725183000,
    pauseDuration: 1800,
    totalDuration: 27000,
    obsStart: 'Hoje cheguei no horário certo',
    obsEnd: 'Hoje saí do trabalho um pouco adiantado'
  },
  {
    email: 'john@email.com',
    today: '07/10/2024',
    month: '10',
    year: '2024',
    startTime: 1725177600,
    endTime: 1725210000,
    pausaInicio: 1725181200,
    pausaFim: 1725183000,
    pauseDuration: 1800,
    totalDuration: 27000,
    obsStart: 'Hoje cheguei no horário certo',
    obsEnd: 'Hoje saí do trabalho um pouco adiantado'
  },
  {
    email: 'john@email.com',
    today: '08/10/2024',
    month: '10',
    year: '2024',
    startTime: 1725177600,
    endTime: 1725210000,
    pausaInicio: 1725181200,
    pausaFim: 1725183000,
    pauseDuration: 1800,
    totalDuration: 27000,
    obsStart: 'Hoje cheguei no horário certo',
    obsEnd: 'Hoje saí do trabalho um pouco adiantado'
  },
  {
    email: 'john@email.com',
    today: '09/10/2024',
    month: '10',
    year: '2024',
    startTime: 1725177600,
    endTime: 1725210000,
    pausaInicio: 1725181200,
    pausaFim: 1725183000,
    pauseDuration: 1800,
    totalDuration: 27000,
    obsStart: 'Hoje cheguei no horário certo',
    obsEnd: 'Hoje saí do trabalho um pouco adiantado'
  },
  {
    email: 'john@email.com',
    today: '10/10/2024',
    month: '10',
    year: '2024',
    startTime: 1725177600,
    endTime: 1725210000,
    pausaInicio: 1725181200,
    pausaFim: 1725183000,
    pauseDuration: 1800,
    totalDuration: 27000,
    obsStart: 'Hoje cheguei no horário certo',
    obsEnd: 'Hoje saí do trabalho um pouco adiantado'
  }
]
async function seed() {
  bulk.map(async (log) => {
    await prisma.timeLogs.create({
      data: log
    })
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
