/**
 * Asynchronously sets the start time for the current session.
 *
 * @param startTime - The start time to be logged, in milliseconds since the Unix epoch.
 * @returns `true` if the start time was successfully logged, or throws an error if there was a problem.
 */
export default async (
  startTime: number,
  userEmail: string,
  obsStart?: string
) => {
  const config = useRuntimeConfig().public

  await $fetch(`${config.API}/${config.API_TIMELOG.START_TIME}`, {
    method: 'post',
    body: {
      userEmail,
      startTime,
      obsStart
    }
  }).catch((error: any) => {
    throw createError({
      ...error.value,
      message: 'Could not post startTime'
    })
  })

  return true
}
