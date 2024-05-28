<script lang='ts' setup>
/**
* Index Page.
* @name 'PageIndex'
* @version 1.0.0
*/
import Button from '~/components/Button/Button.vue';
import { useDayLogsStore } from '~/store/dayLogs'
const time = useCurrentTime()
const dayLogStore = useDayLogsStore()
const obs = ref('')

function registerTime(key: string) {
  dayLogStore.logTime(key, obs.value);
  obs.value = ''
}

const pausa = ref(false)
const textPausa = computed(() => pausa.value ? 'Terminar Pausa' : 'Iniciar Pausa')
function registrarPausa() {
  if (!pausa.value) {
    registerTime('pausaInicio')
    pausa.value = true
  } else {
    registerTime('pausaFim')
    dayLogStore.setSomaPausa()
    pausa.value = false

  }
}

function registrarSaida() {
  registerTime('saida')
  dayLogStore.setSomaSaida()
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
      Button(:loading="pausa" warning :disabled="!dayLogStore.log.entrada || dayLogStore.log.saida" icon='feather:coffee' @click.prevent="registrarPausa") {{ textPausa }}
      Button(danger :disabled="!dayLogStore.log.entrada || dayLogStore.log.saida || pausa" icon='feather:log-out' @click.prevent="registrarSaida") Registrar saída

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
