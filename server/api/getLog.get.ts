/**
 * Retrieves a time log record from the database based on the provided query parameters.
 *
 * @param event - The Nuxt.js event object containing the request query parameters.
 * @returns The value of the specified time log field, or `undefined` if no record is found.
 */
import { PrismaClient } from '@prisma/client'
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  const query = getQuery(event)
  try {
    if (query.userId) {
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
      const key = query.timeKey
      return response ? response[key as keyof typeof response] : false
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.code,
      message: error.message
    })
  }
})
