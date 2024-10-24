/**
 * Handles the POST request to update a time log entry in the database.
 *
 * @param event - The event object containing the request data.
 * @returns True if the update was successful, otherwise throws an error.
 */
import { PrismaClient } from '@prisma/client'
import type { LogData } from '~/Types/LogData'
export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()
  const body = await readBody(event)
  const data: LogData = body.data
  try {
    await prisma.timeLogs.update({
      where: {
        id: body.id,
        email: body.email,
        today: formatToday()
      },
      data
    })
    return true
  } catch (error: any) {
    throw createError({
      ...error.code,
      message: error.message
    })
  }
})
