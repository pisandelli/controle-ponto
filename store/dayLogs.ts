import type { DayLog } from "~/Types/dayLog"
export const useDayLogsStore = defineStore('dayLogs', () => {
  const dayjs = useDayjs()
  const active = ref(false)
  const log = reactive<DayLog>({
    entrada: null,
    pausaInicio: null,
    pausaFim: null,
    saida: null,
    soma: null,
    obs: {
      entrada: null,
      pausaInicio: null,
      pausaFim: null,
      saida: null
    }
  })

function logTime(key: string, obs: string) {
  log[key] = dayjs().format('HH:mm:ss')
  log.obs[key] = obs
  active.value = true
}

 return {active, log, logTime}
})

if (import.meta.hot) {
 import.meta.hot.accept(acceptHMRUpdate(useDayLogsStore, import.meta.hot))
}
