<script lang='ts' setup>
/**
* Index Page.
* @name 'PageIndex'
* @version 1.0.0
*/
import Button from '~/components/Button/Button.vue';
import { useDayLogsStore } from '~/store/dayLogs'
import TextColor from 'utilities/TextColor.module.styl'
const dayjs = useDayjs()
const time = useCurrentTime()
const dayLogStore = useDayLogsStore()
const obs = ref('')

const { pausaInicio, pausaFim } = storeToRefs(dayLogStore)

/**
 * Logs the current time value to the dayLogStore and clears the obs.value.
 * @param {string} key - The key to use when logging the time in the dayLogStore.
 */
function registerTime(key: string) {
  dayLogStore.logTime(key, obs.value);
  obs.value = ''
}

/**
 * Registers the start and end of a pause in the user's activity.
 * When the pause is started, the 'pausaInicio' time is registered.
 * When the pause is ended, the 'pausaFim' time is registered and the total pause duration is added to the dayLogStore.
 */
const pausa = ref(false)
const textPausa = computed(() =>
  pausa.value ? 'Terminar Pausa' : 'Iniciar Pausa',
)
function registrarPausa() {
  if (!pausa.value) {
    pausaInicio.value = dayjs().unix()
    pausa.value = true
  } else {
    pausaFim.value = dayjs().unix()
    dayLogStore.setSomaPausa()
    pausa.value = false
  }
}

/**
 * Registers the time for the user's departure and updates the total departure time in the dayLogStore.
 */
function registrarSaida() {
  registerTime('saida')
  dayLogStore.setSomaSaida()
}

const greetings = {
  entrada: `Registre sua <span class='${TextColor.green}'>entrada.</span>`,
  pausa: `Oba! Uma <span class='${TextColor.orange}'>pausa</span> para o café!`,
  saida: `Registre sua <span class='${TextColor.orange}'>pausa</span> ou <span class='${TextColor.red}'>saída.</span>`,
  descanso: `Tenha um bom descanso!`
}

/**
 * Provides a set of greeting messages based on the current state of the day log.
 * The messages are displayed in the UI to greet the user.
 */
const getGreetings = computed(() => {
  if (!dayLogStore.log.entrada) {
    return greetings.entrada
  } else if (pausa.value) {
    return greetings.pausa
  } else if (dayLogStore.log.saida) {
    return greetings.descanso
  } else {
    return greetings.saida
  }
})

// const pauseCounter = computed(()=>{

// })
</script>

<template lang="pug">
CenterL(intrinsic)
  .greetings
    h1.title(v-html='getGreetings')
  StackL.content
    ClientOnly
      span.time {{ time }}

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
