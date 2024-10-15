/**
 * Sends a log data object to the server using the provided API endpoint.
 *
 * @param data - The log data object to be sent to the server.
 * @param id - The ID associated with the log data.
 * @returns `true` if the log data was successfully sent, otherwise throws an error.
 */
import type { LogData } from '~/Types/LogData'
export default async (id: number, email: string, data: LogData) => {
  const config = useRuntimeConfig().public
  await $fetch(`${config.API}/${config.API_TIMELOG.POST_LOG}`, {
    method: 'post',
    body: {
      id,
      email,
      data
    }
  }).catch((error: any) => {
    throw createError({
      ...error.code,
      message: error.message
    })
  })

  return true
}
