/**
 * Handles the POST request to the `/startTime` endpoint, which creates or updates a time log entry in the database.
 *
 * @param event - The Fastify request event object.
 * @returns `true` if the time log entry was successfully created or updated, otherwise throws an error.
 */
import { PrismaClient } from '@prisma/client'
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  const body = await readBody(event)
  try {
    await prisma.timeLogs.upsert({
      where: {
        id: body.userId,
        day: formatToday()
      },
      update: {},
      create: {
        startTime: body.startTime,
        day: formatToday(),
        userId: body.userId,
        endTime: 0,
        totalDuration: ''
      }
    })
    return true
  } catch (error: any) {
    throw createError({
      ...error.code,
      statusMessage: error.message
    })
  }
})
