//TODO: WORK ON IT LATER

import { PrismaClient } from '@prisma/client'
import { createMock } from 'vitest-mock-extended'
import { defineEventHandler } from 'h3'
import getLog from '../server/api/getLog.get'

const prisma = createMock<PrismaClient>()

describe('getLog', () => {
  beforeEach(() => {
    prisma.timeLogs.findFirst.mockReset()
  })

  it('should return false when no user ID is provided', async () => {
    const event = createEvent({})
    const result = await getLog(event)
    expect(result).toBe(false)
    expect(prisma.timeLogs.findFirst).not.toHaveBeenCalled()
  })

  it('should return the requested time log field when a record is found', async () => {
    const userId = 1
    const day = '2023/05/01'
    const timeKey = 'startTime'
    const startTime = '09:00:00'
    prisma.timeLogs.findFirst.mockResolvedValue({ userId, day, startTime })
    const event = createEvent({ userId: userId.toString(), day, timeKey })
    const result = await getLog(event)
    expect(result).toBe(startTime)
    expect(prisma.timeLogs.findFirst).toHaveBeenCalledWith({
      where: { userId, day }
    })
  })

  it('should return false when no record is found', async () => {
    const userId = 1
    const day = '2023/05/01'
    const timeKey = 'startTime'
    prisma.timeLogs.findFirst.mockResolvedValue(null)
    const event = createEvent({ userId: userId.toString(), day, timeKey })
    const result = await getLog(event)
    expect(result).toBe(false)
    expect(prisma.timeLogs.findFirst).toHaveBeenCalledWith({
      where: { userId, day }
    })
  })

  it('should throw an error when an exception occurs', async () => {
    const userId = 1
    const day = '2023/05/01'
    const timeKey = 'startTime'
    const error = new Error('Database error')
    prisma.timeLogs.findFirst.mockRejectedValue(error)
    const event = createEvent({ userId: userId.toString(), day, timeKey })
    await expect(getLog(event)).rejects.toThrow(error)
    expect(prisma.timeLogs.findFirst).toHaveBeenCalledWith({
      where: { userId, day }
    })
  })
})

function createEvent(query: Record<string, string>) {
  return defineEventHandler(async () => ({
    context: { params: {}, query }
  }))
}
