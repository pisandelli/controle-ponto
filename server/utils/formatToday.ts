/**
 * Formats the current date as a string.
 * @param {string} [format] - The date format string. Defaults to 'DD/MM/YYYY' if not provided.
 * @returns {string} The formatted date string.
 */
import dayjs from 'dayjs'
export default function (format?: string): string {
  return dayjs().format(format ?? 'DD/MM/YYYY')
}
