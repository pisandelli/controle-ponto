/**
 * Handles the POST request to the /api/startTime endpoint.
 * This function creates a new time log entry for the given user and day, or throws an error if an entry for the current day already exists.
 *
 * @param event - The Nuxt.js event object containing the request body.
 * @returns The created time log entry, or throws an error if an entry for the current day already exists.
 */
import { PrismaClient } from '@prisma/client'
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  const body = await readBody(event)
  try {
    const day = body.day
      ? (body.day as string).replace(/-/g, '/')
      : formatToday()
    const existingEntry = await prisma.timeLogs.findFirst({
      where: {
        userId: body.userId,
        day
      }
    })

    if (!existingEntry) {
      const response = await prisma.timeLogs.upsert({
        where: {
          id: body.userId,
          day: formatToday()
        },
        update: {},
        create: {
          startTime: body.startTime,
          day: formatToday(),
          userId: body.userId
        }
      })
      return response
    } else {
      throw createError({
        statusCode: 500,
        message: 'Entry for today already exists'
      })
    }
  } catch (error: any) {
    throw createError({
      ...error.code,
      message: error.message
    })
  }
})
