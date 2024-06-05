import type { DayLog } from '~/Types/dayLog'
export const useDayLogsStore = defineStore('dayLogs', () => {
  const dayjs = useDayjs()
  const active = ref(false)
  const duration = ref(0)
  const pausaInicio = ref<number | null>(null)
  const pausaFim = ref<number | null>(null)
  const log = reactive<DayLog>({
    startTime: null,
    pauseDuration: null,
    endTime: null,
    totalDuration: null,
    obs: {
      startTime: null,
      pausa: null,
      endTime: null
    }
  })

  /**
   * Logs the current time and an observation string for a given key.
   * @param key - The key to associate the time and observation with.
   * @param obs - The observation string to log.
   */
  function logTime(key: string, obs: string) {
    log[key] = dayjs().unix()
    log.obs[key] = obs
    active.value = true
  }

  /**
   * Sets the duration of a pause in a day log.
   * If a pause start and end time are set, calculates the duration of the pause in seconds and updates the `pauseDuration` property of the log.
   * Also sets the `pausaInicio` and `pausaFim` properties of the log to `null`.
   */
  function setSomaPausa() {
    if (pausaInicio.value && pausaFim.value) {
      /**
       * Calculates the duration of a pause in a day log and formats it as a time string.
       *
       * The `duration.value` is incremented by the difference in seconds between the `pausaFim` and `pausaInicio` timestamps of the `log` object.
       * The `pauseDuration` property of the `log` object is then set to the formatted duration string.
       *
       * @param log - The day log object containing the pause start and end timestamps.
       * @param duration - An object containing the accumulated duration value.
       */
      duration.value += dayjs
        .unix(pausaFim.value)
        .diff(dayjs.unix(pausaInicio.value), 's')
      log.pauseDuration = dayjs.duration(duration.value, 's').format('HH:mm:ss')
    }
  }

  /**
   * Calculates the duration between the `startTime` and `saida` properties of a log entry, adjusts it by the duration of a pause, and formats the remaining duration.
   *
   * @param log - An object with `startTime` and `saida` properties representing the start and end times of a log entry, and a `duration` property representing the duration of a pause.
   * @returns The remaining duration formatted as "HH:mm:ss".
   */
  function setSomaSaida() {
    if (log.startTime && log.endTime) {
      /**
       * Calculates the duration in seconds between the `startTime` and `endTime` properties of the `log` object.
       *
       * @param log - An object with `startTime` and `endTime` properties representing the start and end times of a log entry.
       * @returns The duration in seconds between the `startTime` and `endTime` times.
       */
      const startTime = dayjs.unix(log.startTime)
      const endTime = dayjs.unix(log.endTime)
      const diffInOut = dayjs(endTime).diff(dayjs(startTime), 's')
      const durationInOut = dayjs.duration(diffInOut, 's')

      /**
       * Calculates the duration of a pause in seconds and formats the remaining duration.
       *
       * @param duration - The duration of the pause in seconds.
       * @param durationInOut - The total duration to be adjusted by the pause duration.
       * @returns The remaining duration formatted as "HH:mm:ss".
       */
      const pauseDuration = dayjs.duration(duration.value, 's')
      const subSeconds = durationInOut.subtract(pauseDuration).seconds()
      log.totalDuration = dayjs.duration(subSeconds, 's').format('HH:mm:ss')
    }
  }

  return {
    active,
    pausaInicio,
    pausaFim,
    log,
    logTime,
    setSomaPausa,
    setSomaSaida
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDayLogsStore, import.meta.hot))
}
