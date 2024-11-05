/**
 * Retrieves time log records for a specific user, month, and year.
 *
 * @param event - The Nuxt.js event object, which contains the request query parameters.
 * @returns - An array of time log records matching the provided query parameters.
 */
import { PrismaClient } from '@prisma/client'
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  const query = getQuery(event)
  try {
    if (query.userId) {
      const email = query.userId as string
      const month = query.month as string
      const year = query.year as string
      const response = await prisma.timeLogs.findMany({
        where: {
          email,
          month,
          year
        },
        orderBy: {
          today: 'asc'
        }
      })
      return response
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.code,
      message: error.message
    })
  }
})
