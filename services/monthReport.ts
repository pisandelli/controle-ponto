/**
 * Fetches a monthly report for the given user, month, and year.
 *
 * @param options - Options for fetching the report.
 * @param options.userId - The user's email to fetch the report for.
 * @param options.month - The month to fetch the report for (optional, defaults to the current month).
 * @param options.year - The year to fetch the report for (optional, defaults to the current year).
 * @returns The monthly report data.
 */
import type { ReportOptions } from '~/Types/ReportOptions'

export default async (options: ReportOptions) => {
  const config = useRuntimeConfig().public
  const dayjs = useDayjs()
  const month = options.month ?? dayjs().format('MM')
  const year = options.year ?? dayjs().format('YYYY')

  if (!options.userId) {
    throw createError({
      statusCode: 500,
      message: 'User ID is required'
    })
  } else {
    const data = $fetch(
      `${config.API}/${config.API_TIMELOG.MONTH_REPORT}?userId=${options.userId}&month=${month}&year=${year}`
    ).catch((error: any) => {
      throw createError({
        ...error.value,
        message: `Could not get report`
      })
    })

    return data
  }
}
