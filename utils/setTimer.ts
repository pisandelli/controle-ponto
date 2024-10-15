/**
 * Provides a timer functionality with start and stop actions.
 *
 * @returns An object with the following properties:
 *   - `duration`: A ref that holds the current duration of the timer in the format "HH:mm:ss".
 *   - `start`: A function that starts the timer.
 *   - `stop`: A function that stops the timer and resets the duration to 0.
 */
export default function () {
  const dayjs = useDayjs()
  const time = ref(0)
  const duration = ref(dayjs.duration(time.value, 's').format('HH:mm:ss'))
  let interval: ReturnType<typeof setInterval> | undefined
  function start() {
    interval = setInterval(() => {
      time.value++
      duration.value = dayjs.duration(time.value, 's').format('HH:mm:ss')
    }, 1000)
  }
  function stop() {
    if (interval) {
      clearInterval(interval)
      time.value = 0
      duration.value = dayjs.duration(0, 's').format('HH:mm:ss')
    }
  }
  return { time, duration, start, stop }
}
