const config = useRuntimeConfig().public
const path = `${config.API}/${config.API_TIMELOG.START_TIME}`
/**
 * Asynchronously sets the start time for the current session.
 *
 * @param startTime - The start time to be logged, in milliseconds since the Unix epoch.
 * @returns `true` if the start time was successfully logged, or throws an error if there was a problem.
 */
const setStartTime = async (startTime: number, userId: number) => {
  const { error } = await useAsyncData('setStartTime', () =>
    $fetch(path, {
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

/**
 * Asynchronously retrieves the start time for the specified user and day.
 *
 * @param userId - The ID of the user to retrieve the start time for.
 * @param day - The day (in DD-MM-YYYY format) to retrieve the start time for.
 * @returns The start time for the specified user and day, or throws an error if there was a problem retrieving the start time.
 */
const getStartTime = async (userId: number, day: string) => {
  const { data, error } = await useAsyncData('getStartTime', () =>
    $fetch(`${path}?userId=${userId}&day=${day}`)
  )
  if (error.value) {
    throw createError({
      ...error.value,
      message: 'Could not get startTime'
    })
  }
  return data
}

export { setStartTime, getStartTime }
