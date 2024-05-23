<script lang='ts' setup>
/**
* A small tabel to show
* Day's log
* @name 'WLogTable'
* @version 1.0.0
*/
import type { DayLog } from '~/Types/dayLog';
const today = useToday()
const dataSource: DayLog[] = [
  {
    key: '1',
    entrada: '08:05:20',
    pausaInicio: '10:00:01',
    pausaFim: '10:10:06',
    saida: '12:20:45',
    obs: {
      entrada: '',
      pausaInicio: 'Essa é uma observação do inicio da pausa Lorem Essa é uma observação do inicio da pausa Lorem Essa é uma observação do inicio da pausa Lorem',
      pausaFim: '',
      saida: 'Essa é uma observação da Saída'
    }
  }
]

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
          APopover(title='Observações' :overlayStyle="{ maxInlineSize: '300px' }")
            template(#content)
              p {{ record.obs[`${column.key}`] }}
            Icon.icon(name='feather:info' size='1em' color='var(--color-primary)')

</template>

<style lang="stylus" scoped>
.pop
  --clusterl-gap: .5rem
  user-select: none
.icon
  cursor: pointer
.log
  inline-size: 100%

.today
  font-size: var(--font-size-small)
  font-weight: var(--weight-medium)
</style>
