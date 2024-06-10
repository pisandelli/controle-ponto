const config = useRuntimeConfig().public
/**
 * Asynchronously sets the start time for the current session.
 *
 * @param startTime - The start time to be logged, in milliseconds since the Unix epoch.
 * @returns `true` if the start time was successfully logged, or throws an error if there was a problem.
 */
const setStartTime = async (startTime: number, userId: number) => {
  const { error } = await useAsyncData('setStartTime', () =>
    $fetch(`${config.API}/${config.API_TIMELOG.START_TIME}`, {
      method: 'post',
      body: {
        userId,
        startTime
      }
    })
  )

  if (error.value) {
    throw createError({
      ...error.value,
      message: 'Could not post startTime'
    })
  }

  return true
}

export { setStartTime }
