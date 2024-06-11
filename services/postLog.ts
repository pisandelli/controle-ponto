// ADD a função de adicionar o time log...
// escolher os pause durations
// e colocar na função de caluclar oa total duration do pause

import type { LogData } from '~/Types/LogData'
const config = useRuntimeConfig().public
export default async (data: LogData, id: number) => {
  const { error } = await useAsyncData('setStartTime', () =>
    $fetch(`${config.API}/${config.API_TIMELOG.POST_LOG}`, {
      method: 'post',
      body: {
        id,
        data
      }
    })
  )

  if (error.value) {
    throw createError({
      ...error.value,
      message: 'Could not post startTime'
    })
  }

  return true
}
