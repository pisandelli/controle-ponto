import type { DayLog } from '~/Types/dayLog'
import checkLog from '~/services/checkLog'
// import getStartTime from '~/services/getLog'
export const useDayLogsStore = defineStore('dayLogs', () => {
  const userId = ref(1)
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
   * Checks if there is an existing log and sets the initial state of the day log.
   *
   * This function is called to initialize the day log state. It checks if there is an existing log using the `checkLog` function, and sets the `startTime` property of the `log` object accordingly. It also sets the `active` flag based on whether there is an existing log or not.
   */
  async function __checkInitialLog() {
    const hasLog = await checkLog(userId.value)
    if (hasLog) {
      log.startTime = hasLog.startTime
      active.value = true
    }
  }
  __checkInitialLog()

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

  // TODO: Get UserId from Supabase
  /**
   * Checks the start time for the user's log entry.
   *
   * This function retrieves the start time for the user's log entry from the server using the `getLog` function. If the start time is successfully retrieved, it is stored in the `log.startTime` property. If an error occurs, the error is returned.
   *
   * @param userId - The ID of the user whose log entry start time is being checked.
   * @returns The start time of the user's log entry, or an error if the retrieval fails.
   */
  // async function checkStartTime(userId: number | 1) {
  //   const response = await getStartTime(userId, 'startTime')
  //   // .then((): number => (log.startTime = response))
  //   // .catch((error) => error)
  //   return response
  // }

  return {
    active,
    pausaInicio,
    pausaFim,
    log,
    logTime,
    setSomaPausa,
    setSomaSaida
    // checkStartTime
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDayLogsStore, import.meta.hot))
}
