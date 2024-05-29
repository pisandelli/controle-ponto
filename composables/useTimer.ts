export const useTimer = () => {
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
  return { duration, start, stop }
}
