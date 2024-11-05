/**
 * Retrieves the first time log entry for the specified user and day.
 *
 * @param event - The Nuxt.js event object, which contains the query parameters.
 * @returns The first time log entry for the specified user and day, or `false` if no entry is found.
 */
import { PrismaClient } from '@prisma/client'
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  const query = getQuery(event)
  try {
    if (query.email) {
      const email = query.email as string
      const today = query.today
        ? (query.today as string).replace(/-/g, '/')
        : formatToday()
      const response = await prisma.timeLogs.findFirst({
        where: {
          email,
          today
        }
      })
      return response || false
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.code,
      message: error.message
    })
  }
})
