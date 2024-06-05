/**
 * Retrieves the start time for a user's time log entry on a specific day.
 *
 * @param event - The Nuxt.js event object, which contains the request query parameters.
 * @param event.query.userId - The ID of the user whose time log entry is being retrieved.
 * @param event.query.day - The day for which the time log entry is being retrieved, in the format 'DD/MM/YYYY'.
 * @returns The start time of the user's time log entry for the specified day, or `undefined` if no entry is found.
 */
import { PrismaClient } from '@prisma/client'
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  const query = getQuery(event)
  try {
    if (query.userId && query.day) {
      const timeRec = await prisma.timeLogs.findFirst({
        where: {
          userId: +query.userId,
          day: (query.day as string).replace(/-/g, '/')
        }
      })
      return timeRec?.startTime
    }
  } catch (error: any) {
    throw createError({
      ...error.code,
      statusMessage: error.message
    })
  }
})
