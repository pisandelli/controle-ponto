import type { DayLog } from '~/Types/dayLog'
import checkLog from '~/services/checkLog'
// import getStartTime from '~/services/getLog'
export const useDayLogsStore = defineStore('dayLogs', () => {
  // TODO: Get UserId from Supabase
  const userId = ref(1)
  const dayjs = useDayjs()
  const active = ref(false)
  const duration = ref(0)
  const log = reactive<DayLog>({
    id: null,
    startTime: null,
    pauseDuration: null,
    endTime: null,
    pausaInicio: null,
    pausaFim: null,
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
      //TODO: change this to a log object like when obs are ready
      log.id = hasLog.id
      log.startTime = hasLog.startTime
      log.pausaInicio = hasLog.pausaInicio ?? null
      log.pausaFim = hasLog.pausaFim ?? null
      log.pauseDuration = hasLog.pauseDuration ?? null
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
   * Calculates the duration of a pause and updates the `duration` and `pauseDuration` properties of the `log` object.
   *
   * This function is called when the pause time is available (i.e., `log.pausaInicio` and `log.pausaFim` are not null). It calculates the duration of the pause in seconds, updates the `duration` and `pauseDuration` properties of the `log` object, and sets `log.pausaInicio` to `null`.
   */
  function setSomaPausa() {
    if (log.pausaInicio && log.pausaFim) {
      duration.value += dayjs
        .unix(log.pausaFim)
        .diff(dayjs.unix(log.pausaInicio), 's')
      log.pauseDuration = dayjs.duration(duration.value, 's').format('HH:mm:ss')
      log.pausaInicio = null
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
    duration,
    active,
    log,
    logTime,
    setSomaPausa,
    setSomaSaida
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDayLogsStore, import.meta.hot))
}
