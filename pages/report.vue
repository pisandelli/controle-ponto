<script lang='ts' setup>
/**
* Página de relatório de ponto.
* @name 'ReportPage'
* @version 1.0.0
*/

import type { ReportOptions } from '~/Types/ReportOptions'

import Text from 'utilities/Text.module.styl'
import { useUserStore } from '~/store/user'

/**
 * Applies the 'user' middleware to the 'ReportPage' route.
 * This middleware ensures that only authenticated users can access the report page.
 */
definePageMeta({
  middleware: ['user']
})

const userStore = useUserStore()
// const userId = ref(userStore.user?.email)
const userId = ref('john@email.com')

const dayjs = useDayjs()
const monthLiteral = ref(dayjs().format('MMMM'))
// const month = ref(dayjs().format('MM'))
const month = ref('10')
const year = ref(dayjs().format('YYYY'))

const options = ref<ReportOptions>({ userId: userId.value, month: month.value, year: year.value })

</script>

<template lang="pug">
CenterL(tag='article')
  StackL(tag="section")
    StackL(tag="header" compact)
      h1.title Relatório de Ponto - <span :class='Text.capitalize'>{{ monthLiteral }}</span>
      ul.details
        li 
          | Nome: &nbsp;
          small {{ userStore.user?.username }}
        li 
          | Data do Relatório: &nbsp;
          small {{ formatToday() }}
    ReportTable(:options='options')
</template>

<style lang="stylus" scoped>
article
  --centerl-max-width: 70rem

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
</style>
