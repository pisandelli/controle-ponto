/**
 * Handles the POST request for creating a new time log entry.
 *
 * This function checks if there is an existing time log entry for the current day and the given user email. If no entry exists, it creates a new time log entry with the provided start time, day, user email, and observation start time. If an entry already exists, it throws an error.
 *
 * @param event - The Nuxt.js event object containing the request body.
 * @returns The created time log entry, or throws an error if an entry already exists for the day.
 */
import { PrismaClient } from '@prisma/client'
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  const body = await readBody(event)
  try {
    const existingEntry = await prisma.timeLogs.findFirst({
      where: {
        today: formatToday(),
        email: body.userEmail
      }
    })

    if (!existingEntry) {
      const response = await prisma.timeLogs.create({
        data: {
          startTime: body.startTime,
          today: formatToday(),
          email: body.userEmail,
          obsStart: body.obsStart
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
