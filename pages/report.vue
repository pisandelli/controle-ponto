<script lang='ts' setup>
/**
* Página de relatório de ponto.
* @name 'ReportPage'
* @version 1.0.0
*/

import { useDayLogsStore } from '@/store/dayLogs'
import { useUserStore } from '~/store/user'
import Text from 'utilities/Text.module.styl'

definePageMeta({
  middleware: ['user']
})

const dayLogStore = useDayLogsStore()
const dataSource = computed(() => {
  return !!dayLogStore.active ? [dayLogStore.log] : []
})

const userStore = useUserStore()

const dayjs = useDayjs()
const today = formatToday('DD/MM/YYYY')
const month = dayjs().format('MMMM')
const columns = [
  {
    title: 'Data'
  },
  {
    title: 'Entrada'
  },
  {
    title: 'Pausa'
  },
  {
    title: 'Saída'
  },
  {
    title: 'Total de horas'
  },
  {
    title: 'Observações'
  },
]
</script>

<template lang="pug">
CenterL
  StackL(tag="section")
    StackL(tag="header" compact)
      h1.title Relatório de Ponto - <span :class='Text.capitalize'>{{ month }}</span>
      ul.details
        li 
          | Nome: &nbsp;
          small {{ userStore.user?.username }}
        li 
          | Data do Relatório: &nbsp;
          small {{ today }}
    table
      thead
        tr
          th(v-for='column in columns') {{ column.title }}
      tbody
        tr(v-for='i in 22')
          td {{ today }}
          td 08:00
          td 01:15
          td 17:10
          td 08:00
          td.left
            p Observações entrada
            p obs Saida

</template>

<style lang="stylus" scoped>
.title
  font-size: var(--font-size-big)
  font-weight: var(--weight-bold)

.details 
  list-style-type: none
  li
    font-weight: var(--weight-bold)

small
  font-weight: var(--weight-regular)
  font-size: var(--font-size-small) 

table
  width: 100%
  border-collapse: collapse
  thead
    tr
      background-color: var(--color-gray-25)
      border-bottom: 1px solid var(--color-gray-50)
    th
      padding: .5rem
      font-weight: var(--weight-bold)
  tbody
    font-size: var(--font-size-tiny)
    tr:nth-child(even)
      background-color: var(--color-gray-25)
    td
      padding: .3rem
      border-bottom: 1px solid var(--color-gray-50)
      &:not(.left)
        text-align: center
</style>
