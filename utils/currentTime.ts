/**
 * Provides a reactive current time value that updates every 10 milliseconds.
 * This composable sets up an interval that updates the `time` ref with the
 * current time in the format 'HH:mm:ss'. The interval is cleared when the
 * component is unmounted.
 *
 * @returns {Ref<string>} A ref containing the current time as a string in the format 'HH:mm:ss'.
 */
export default function (): Ref<string> {
  const dayjs = useDayjs()
  const time = ref(dayjs().format('HH:mm:ss'))
  let interval: ReturnType<typeof setInterval> | undefined
  onMounted(() => {
    interval = setInterval(() => {
      time.value = dayjs().format('HH:mm:ss')
    }, 10)
  })
  onUnmounted(() => {
    if (interval) {
      clearInterval(interval)
    }
  })
  return time
}
