<script lang='ts' setup>
/**
* A small table to show
* Day's log
* @name 'WLogTable'
* @version 1.0.0
*/
import { useDayLogsStore } from '~/store/dayLogs';
const dayLogStore = useDayLogsStore()
const dataSource = computed(() => {
  return !!dayLogStore.active ? [dayLogStore.log] : []
})

const today = useToday()

const columns = [
  {
    title: 'Entrada',
    dataIndex: 'entrada',
    key: 'entrada',
  },
  {
    title: 'Inicio Pausa',
    dataIndex: 'pausaInicio',
    key: 'pausaInicio',
  },
  {
    title: 'Fim Pausa',
    dataIndex: 'pausaFim',
    key: 'pausaFim',
  },
  {
    title: 'Saída',
    dataIndex: 'saida',
    key: 'saida',
  },
  {
    title: 'Total de horas',
    dataIndex: 'totalHoras',
    key: 'totalHoras'
  }
]
</script>

<template lang="pug">
StackL.log(compact)
  p.today Registros para: {{ today }}
  ATable(:columns='columns' :dataSource='dataSource' :pagination='false')
    template(#bodyCell="{ column, text, record }")
      ClusterL.pop
        p {{ text }}
        template(v-if="record.obs[`${column.key}`]")
          APopover(title='Observações' :overlayStyle="{ maxInlineSize: '300px' }" :locale="{ emptyText: 'Sem registros' }")
            template(#content)
              p {{ record.obs[`${column.key}`] }}
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
