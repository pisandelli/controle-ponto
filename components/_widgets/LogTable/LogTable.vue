<script lang='ts' setup>
/**
* A small table to show
* Day's log
* @name 'WLogTable'
* @version 1.0.0
*/
import { useDayLogsStore } from '@/store/dayLogs'
const dayLogStore = useDayLogsStore()
const dataSource = computed(() => {
  return !!dayLogStore.active ? [dayLogStore.log] : []
})

const today = formatToday('dddd - DD/MM/YYYY')

const columns = [
  {
    title: 'Entrada',
    dataIndex: 'startTime',
    key: 'startTime',
    duration: false
  },
  {
    title: 'Pausa',
    dataIndex: 'pauseDuration',
    key: 'pauseDuration',
    duration: true
  },
  {
    title: 'Saída',
    dataIndex: 'endTime',
    key: 'endTime',
    duration: false
  },
  {
    title: 'Total de horas',
    dataIndex: 'totalDuration',
    key: 'totalDuration',
    duration: true
  }
]

/**
 * Checks if the given record has an observation for the specified key.
 *
 * @param record - The record object containing the observation data.
 * @param key - The key to check for an observation.
 * @returns `true` if an observation exists for the given key, `false` otherwise.
 */
function checkObs(record: Record<string, any>, key: string) {
  switch (key) {
    case 'startTime':
      return record.obsStart || false
    case 'endTime':
      return record.obsEnd || false
    default:
      return false
  }
}
</script>

<template lang="pug">
StackL.log(compact)
  p.today Registros para: {{ today }}
  ATable(:columns='columns' :dataSource='dataSource' :pagination='false')
    template(#bodyCell="{ column, text, record }")
      ClusterL.pop
        p(v-if="!column.duration && text !== null") {{ $dayjs.unix(text).format('HH:mm:ss') }}
        p(v-else-if="column.duration && text !== null") {{ $dayjs.duration(text, 's').format('HH:mm:ss') }}
        template(v-if="checkObs(record, `${column.key}`)")
          APopover(title='Observações' :overlayStyle="{ maxInlineSize: '300px' }" :locale="{ emptyText: 'Sem registros' }")
            template(#content)
              p(v-if="column.key === 'startTime'") {{ record.obsStart }}
              p(v-if="column.key === 'endTime'") {{ record.obsEnd }}
            Icon.icon(name='feather:info' size='1em' color='var(--color-primary)')

</template>

<style lang="stylus" scoped>
.pop
  --clusterl-gap: .5rem
  user-select: none
  font-weight: var(--weight-medium)
  color: var(--color-primary-dark-25)
.icon
  cursor: pointer
.log
  inline-size: 100%

.today
  font-size: var(--font-size-small)
  font-weight: var(--weight-medium)
</style>
