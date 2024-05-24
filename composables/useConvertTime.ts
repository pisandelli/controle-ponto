/**
 * Converts a Unix timestamp to a formatted time string.
 *
 * @param unixTime - The Unix timestamp to be converted.
 * @returns A ref containing the formatted time string in the format 'HH:mm:ss'.
 */
export const useConvertTime = (unixTime: number) => {
  const dayjs = useDayjs();
  const time = dayjs(unixTime).format('HH:mm:ss');
  return time
};
