/**
 * Fetches the check log data for the specified user and optional day.
 *
 * @param options - An object containing the user ID and optional day to fetch the check log for.
 * @param options.email - The user's email to fetch the check log for.
 * @param options.day - The optional day to fetch the check log for, in the format 'DD-MM-YYYY'.
 * @returns The check log data for the specified user and day.
 * @throws {Error} If there is an error fetching the check log data.
 */
export default async (email: string, today?: string) => {
  const config = useRuntimeConfig().public
  const data = $fetch(
    `${config.API}/${config.API_TIMELOG.CHECK_LOG}?email=${email}&today=${today ?? formatToday()}`
  ).catch((error: any) => {
    throw createError({
      ...error.value,
      message: `Could not get timelog`
    })
  })

  return data
}
