import type { DayLog } from '~/Types/dayLog'
import { useUserStore } from './user'
import checkLog from '~/services/checkLog'
import postLog from '~/services/postLog'
import logStartTime from '~/services/logStartTime'
export const useDayLogsStore = defineStore('dayLogs', () => {
  const userEmail = useUserStore().user?.email
  const dayjs = useDayjs()
  const active = ref(false)
  const firstLog = ref(true)
  const isLoading = ref(true)
  const log = reactive<DayLog>({
    id: null,
    email: null,
    startTime: null,
    pauseDuration: 0,
    endTime: null,
    pausaInicio: null,
    pausaFim: null,
    totalDuration: 0,
    obs: {
      startTime: null,
      pausa: null,
      endTime: null
    }
  })

  /**
   * Updates the time log data based on the user's activity.
   * This function is responsible for fetching the user's existing
   * log data, updating the log object with the latest information,
   * and setting the `active` and `isLoading` flags accordingly.
   */
  async function __updateTimeLog() {
    if (!userEmail) return
    const hasLog = await checkLog(userEmail)
    if (hasLog) {
      firstLog.value = false
      log.id = hasLog.id
      log.email = hasLog.email
      log.startTime = hasLog.startTime
      log.endTime = hasLog.endTime ?? null
      log.pausaInicio = hasLog.pausaInicio ?? null
      log.pausaFim = hasLog.pausaFim ?? null
      log.pauseDuration = hasLog.pauseDuration
      log.totalDuration = hasLog.totalDuration
      active.value = true
    }
    isLoading.value = false
  }

  __updateTimeLog()

  /**
   * Updates the time log data based on the user's activity.
   * This function is responsible for logging the start time of the first log,
   * or updating the existing log with the current time for the specified key
   * (e.g. 'startTime', 'endTime'). It also updates the `active` and `isLoading`
   * flags accordingly.
   *
   * @param key - The key to update in the log object (e.g. 'startTime', 'endTime')
   * @param obs - An optional string observation to include in the log
   * @returns {Promise<void>}
   */
  async function logTime(key: string, obs?: string): Promise<void> {
    if (!userEmail) return
    isLoading.value = true

    const now = dayjs().unix()
    if (firstLog.value) {
      await logStartTime(now, userEmail)
      firstLog.value = false
    } else {
      if (log.id) await postLog(log.id, { [key]: now }, log.email as string)
    }
    await __updateTimeLog()
    await setSomaSaida()
    active.value = true
  }

  /**
   * Updates the pause duration in the time log based on the user's pause activity.
   * This function is responsible for calculating the total pause duration by
   * subtracting the start time of the pause from the end time of the pause, and
   * updating the `pauseDuration` property of the log object. It then updates the
   * log data in the database with the new pause duration.
   */
  async function setSomaPausa() {
    if (log.pausaInicio && log.pausaFim) {
      log.pauseDuration += dayjs
        .unix(log.pausaFim)
        .diff(dayjs.unix(log.pausaInicio), 's')

      if (log.id) {
        await postLog(
          log.id,
          { pauseDuration: log.pauseDuration },
          log.email as string
        )
        await __updateTimeLog()
      }
    }
  }

  /**
   * Updates the total duration of the time log based on the user's in and out activity.
   * This function is responsible for calculating the total duration of the log by
   * subtracting the start time from the end time, and then subtracting the pause
   * duration. It then updates the `totalDuration` property of the log object and
   * saves the updated log data to the database.
   */
  async function setSomaSaida() {
    if (log.startTime && log.endTime) {
      const startTime = dayjs.unix(log.startTime)
      const endTime = dayjs.unix(log.endTime)
      const diffInOut = dayjs(endTime).diff(dayjs(startTime), 's')

      log.totalDuration = dayjs
        .duration(diffInOut - log.pauseDuration, 's')
        .asSeconds()

      if (log.id) {
        await postLog(
          log.id,
          { totalDuration: log.totalDuration },
          log.email as string
        )
        await __updateTimeLog()
      }
    }
  }
  return {
    active,
    log,
    logTime,
    setSomaPausa,
    setSomaSaida,
    isLoading
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDayLogsStore, import.meta.hot))
}
