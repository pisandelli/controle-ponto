<script lang="ts" setup>
/**
 * Table to display LogTime report.
 * @name 'ReportTable'
 * @version 1.0.0
 */
import type { DayLog } from '~/Types/dayLog'
import monthReport from '~/services/monthReport'
import type { ReportOptions } from '~/Types/ReportOptions'
import Text from 'utilities/Text.module.styl'

const dayjs = useDayjs()
const props = defineProps<{ options: ReportOptions }>()
const {
  userId,
  month = dayjs().format('MM'),
  year = dayjs().format('YYYY')
} = props.options

const logs = ref<DayLog[]>([])

/**
 * Fetches the month report data for the given user, month, and year.
 * This function is called when the component is mounted to initialize the report data.
 *
 * @param userId - The ID of the user to fetch the report for.
 * @param month - The month to fetch the report for, in the format 'MM'.
 * @param year - The year to fetch the report for, in the format 'YYYY'.
 * @returns A Promise that resolves to an array of DayLog objects representing the report data.
 */
onMounted(async () => {
  logs.value = await monthReport({ userId, month, year })
  generateLogReport()
})

const daysInMonth = dayjs(month).daysInMonth()

interface LogReport {
  today: string
  weekday: number
  startTime?: string | null
  pauseDuration?: string | null
  endTime?: string | null
  totalDuration?: string | null
  obsStart?: string
  obsEnd?: string
}

const reports = reactive<LogReport[]>([])
const workDays = ref(0)

/**
 * Generates a report of log entries for each day in the current month.
 * The report includes the date, weekday, start time, pause duration, end time, total duration, and any observations.
 * The report is stored in the `reports` array.
 *
 * @param daysInMonth - The number of days in the current month.
 * @param month - The current month in the format 'MM'.
 * @param year - The current year in the format 'YYYY'.
 * @param logs - An array of `DayLog` objects representing the log entries for the current month.
 * @returns void
 */
function generateLogReport() {
  for (let day = 1; day <= daysInMonth; day++) {
    const formattedDay = day.toString().padStart(2, '0')
    const currentDate = `${formattedDay}/${month}/${year}`
    const weekday = dayjs(currentDate, 'DD/MM/YYYY').day()
    workDays.value += weekday === 0 || weekday === 6 ? 0 : 1
    const report: LogReport = {
      today: currentDate,
      weekday,
    }
    const hasLog = logs.value.find((log) => log.today === currentDate)
    reports.push({
      ...report,
      startTime: hasLog && hasLog.startTime ? dayjs.unix(hasLog.startTime).format('HH:mm:ss') : '--',
      pauseDuration: hasLog && hasLog.pauseDuration ? dayjs.unix(hasLog.pauseDuration).format('HH:mm:ss') : '--',
      endTime: hasLog && hasLog.endTime ? dayjs.unix(hasLog.endTime).format('HH:mm:ss') : '--',
      totalDuration: hasLog && hasLog.totalDuration ? dayjs.unix(hasLog.totalDuration).format('HH:mm:ss') : '--',
      obsStart: hasLog ? hasLog?.obsStart || '' : '',
      obsEnd: hasLog ? hasLog?.obsEnd || '' : ''
    })
  }
}

const columns = [
  { title: 'Data' },
  { title: 'Entrada' },
  { title: 'Pausa' },
  { title: 'Saída' },
  { title: 'Total de horas' },
  { title: 'Observações' },
  { title: 'Ações' }
]
</script>

<template lang="pug">
ModalL(v-if='!logs.length')
  Loading(label='Carregando registros de ponto...')
table(v-else)
  thead
    tr
      th(v-for='column in columns') {{ column.title }}
  tbody
    template(v-for='log in reports')
      tr(:class="{ weekend: log.weekday === 6 || log.weekday === 0 }")
        td(:class='Text.capitalize') {{ dayjs().weekday(log.weekday).format('ddd') }} - {{ log.today }}
        td {{ log.startTime }}
        td {{ log.pauseDuration }}
        td {{ log.endTime }}
        td {{ log.totalDuration }}
        td.left
          p.bold(v-if='log.obsStart') Obs entrada: 
            span {{ log.obsStart }}
          p.bold(v-if='log.obsEnd') Obs Saída: 
            span {{ log.obsEnd }}
        td
          NuxtLink.edit(to='#') Ajustar
  tfoot
    tr
      td.left(colspan='7')
        p Número de registros: {{ logs.length }} / {{ workDays }}
</template>

<style lang="stylus" scoped>
.bold
  font-weight: var(--weight-bold)
  &:first-child
    margin-bottom: .5rem
  span
    font-weight: var(--weight-regular)

.edit
  color: var(--color-primary)
  text-decoration: none
  font-weight: var(--weight-bold)

.weekend
  background-color: var(--color-gray-75)
  color: var(--color-gray-dark-50)
  font-weight: var(--weight-bold)

table
  width: 100%
  border-collapse: separate 
  border-spacing: 0 2px
  font-family: "monospace"
  thead
    tr
      background-color: var(--color-gray-dark-50)
    th
      padding: .5rem
      font-weight: var(--weight-bold)
      color: var(--color-neutral)
  tbody
    font-size: var(--font-size-tiny)
    tr:not(.weekend)
      &:hover
        background-color: var(--color-primary-25)
      &:nth-child(even):not(:hover)
        background-color: var(--color-gray-25)
    td
      padding: .3rem
      &:not(.left)
        text-align: center
  
  tfoot
    td
      padding-block-start: 1rem
      border-top: 1px solid var(--color-gray-50)
</style>
