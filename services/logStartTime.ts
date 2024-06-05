const config = useRuntimeConfig().public
const path = `${config.API}/${config.API_TIMELOG.START_TIME}`
/**
 * Asynchronously sets the start time for the current session.
 *
 * @param startTime - The start time to be logged, in milliseconds since the Unix epoch.
 * @returns `true` if the start time was successfully logged, or throws an error if there was a problem.
 */
const setStartTime = async (startTime: number) => {
  const { error } = await useAsyncData('setStartTime', () =>
    $fetch(path, {
      method: 'post',
      body: {
        day: formatToday('DD/MM/YYYY'),
        startTime
      }
    })
  )

  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: 'Could not post startTime'
    })
  }

  return true
}

/**
 * Asynchronously retrieves the start time for the current session.
 * @returns The start time in milliseconds since the Unix epoch, or throws an error if there was a problem retrieving the start time.
 */
const getStartTime = async () => {
  const { data, error } = await useAsyncData('getStartTime', () => $fetch(path))
  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: 'Could not get startTime'
    })
  }
  return data
}

export { setStartTime, getStartTime }
