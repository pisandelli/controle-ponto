/**
 * Fetches log data for a given user, time key, and optional day.
 *
 * @param options - An object containing the following properties:
 * @param options.userId - The ID of the user to fetch log data for.
 * @param options.key - The time key to fetch log data for.
 * @param options.day - (optional) The specific day to fetch log data for.
 * @returns The fetched log data.
 * @throws {Error} If there was an error fetching the log data.
 */
interface GetLogOptions {
  userEmail: string
  key: string
  day?: string
}
export default async (options: GetLogOptions) => {
  const config = useRuntimeConfig().public
  const { data, error } = await useAsyncData('getStartTime', () => {
    return $fetch(
      `${config.API}/${config.API_TIMELOG.GET_LOG}?userId=${options.userEmail}&timeKey=${options.key}&day=${options.day ?? formatToday()}`
    )
  })
  if (error.value) {
    throw createError({
      ...error.value,
      message: `Could not get ${options.key} data`
    })
  }
  return data
}
