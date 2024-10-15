/**
 * Returns the current date formatted as a string.
 *
 * @param {string} [format] - The format string to use for the date. If not provided, the default format is 'dddd - DD/MM/YYYY'.
 * @returns {string} The current date formatted as a string.
 */
export default function (format?: string): string {
  const dayjs = useDayjs()
  return dayjs().format(format ?? 'DD/MM/YYYY')
}
