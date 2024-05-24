<script lang='ts' setup>
/**
* Index Page.
* @name 'PageIndex'
* @version 1.0.0
*/
import { useDayLogsStore } from '~/store/dayLogs'
const time = useCurrentTime()
const dayLogStore = useDayLogsStore()
const obs = ref('')

function registerTime(key: string) {
  dayLogStore.logTime(key, obs.value);
  obs.value = ''
}

</script>

<template lang="pug">
CenterL(intrinsic)
  ClientOnly
    span.time {{ time }}
  StackL.content
    .greetings
      h1.title Registre sua <span class='in'>entrada</span>

    .input-group
      label(for='obs') Observações
      ClientOnly
        ATextarea(:rows='4' id='obs' v-model:value='obs')

    ClusterL(between)
      Button(success :disabled="dayLogStore.log.entrada" icon='feather:log-in' @click.prevent="registerTime('entrada')") Registrar entrada
      Button(warning :disabled="!dayLogStore.log.entrada" icon='feather:coffee' @click.prevent="registerTime('pausaInicio')") Registrar pausa
      Button(danger :disabled="!dayLogStore.log.entrada" icon='feather:log-out' @click.prevent="registerTime('saida')") Registrar saída

  WLogTable.table

</template>
<style lang='stylus' scoped>
.content 
  inline-size: 100%
  align-items: center

label
  font-weight: var(--weight-bold)

.time
  font-size: 6rem
  font-weight: var(--weight-bold)
  color: var(--color-primary-50)

.greetings
  text-align: center
  margin-block-end: 1rem

.title
  font-size: var(--font-size-big)
  font-weight: var(--weight-bold)

.in
  color: var(--color-success)

.input-group
  inline-size: 100%
.table
  margin-block-start: 4rem
</style>
