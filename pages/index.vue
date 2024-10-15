<script lang='ts' setup>
/**
 * Index Page.
 * @name 'PageIndex'
 * @version 1.0.0
 */
import { useDayLogsStore } from '~/store/dayLogs'
import TextColor from 'utilities/TextColor.module.styl'

definePageMeta({
  middleware: ['user']
})

const dayjs = useDayjs()
const time = currentTime()
const dayLogStore = useDayLogsStore()
const obs = ref('')
const loadingLabel = ref('Carregando...')

/**
 * Checks if there is an unstopped pause registered in the dayLogStore, 
 * and if so, restarts the pause timer and registers the pause.
 * This is called when the component is mounted, to ensure any previous 
 * pauses are properly restored.
 */
onMounted(async () => {
  await dayLogStore.updateTimeLog()
  if (dayLogStore.log.pausaInicio) {
    timer.time.value = dayjs().diff(
      dayjs.unix(dayLogStore.log.pausaInicio),
      's'
    )
    registrarPausa()
  }
})

const pausa = ref(false)
const textPausa = computed(() => pausa.value ? 'Terminar Pausa' : 'Iniciar Pausa')
const timer = setTimer()

/**
 * Registers the start and end of a pause in the user's activity.
 * When the pause is started, the 'pausaInicio' time is registered.
 * When the pause is ended, the 'pausaFim' time is registered and 
 * the total pause duration is added to the dayLogStore.
 */
function registrarPausa() {
  const currentTime = dayjs().unix()
  if (!dayLogStore.log.pausaInicio) {
    dayLogStore.log.pausaInicio = currentTime
  }
  if (!pausa.value) {
    loadingLabel.value = 'Iniciando Pausa...'
    timer.start()
    pausa.value = true
    dayLogStore.logTime('pausaInicio')
    modalAlert()
  } else {
    loadingLabel.value = 'Finalizando Pausa...'
    dayLogStore.log.pausaFim = currentTime
    timer.stop()
    pausa.value = false
    dayLogStore.logTime('pausaFim')
    dayLogStore.setSomaPausa()
  }
}

/**
 * Displays a success modal to the user, informing them that 
 * they have started their break period.
 * The modal includes a message reminding the user to remember 
 * to register the end of their break when they return.
 */
const modalAlert = () => {
  Modal.success({
    title: 'Você iniciou seu período de pausa!',
    content: h('div', {}, [
      h(
        'p',
        'Quando voltar, não esqueça de registrar o término da sua pausa.'
      )
    ]),
    onOk() { },
    centered: true,
    okText: 'Entendi'
  })
}

/**
 * Logs the current time to the dayLogStore under the specified key.
 * @param key - The key to use when logging the time, e.g. 'startTime' or 'endTime'.
 * @param obsData - An optional observation value to associate with the logged time.
 */
async function registerTime(key: string, obsData?: string) {
  await dayLogStore.logTime(key, obsData)
}

/**
 * Registers the user's start time for the day.
 * This function is called when the user indicates they are starting their workday.
 * It sets the `loadingLabel` to indicate the action being performed,
 * calls the `registerTime` function to log the start time to the `dayLogStore`,
 * and then clears the `obs` value.
 */
async function registrarEntrada() {
  loadingLabel.value = 'Registrando entrada...'
  await registerTime('startTime', obs.value)
  obs.value = ''
}


/**
 * Registers the user's exit time for the day.
 * This function is called when the user indicates they are leaving for the day.
 * It sets the `loadingLabel` to indicate the action being performed,
 * calls the `registerTime` function to log the end time to the `dayLogStore`,
 * and then calls the `setSomaSaida` function to update the total time worked.
 */
async function registrarSaida() {
  loadingLabel.value = 'Registrando saída...'
  await registerTime('endTime', obs.value)
  obs.value = ''
}


/**
 * Provides a set of greeting messages based on the current state of the day log.
 * The messages are displayed in the UI to greet the user.
 */
const greetings = {
  startTime: `Registre sua <span class="${TextColor.green}">entrada.</span>`,
  pausa: `Oba! Uma <span class="${TextColor.info}">pausa</span> para o café!`,
  endTime: `Registre sua <span class="${TextColor.info}">pausa</span> ou <span class="${TextColor.red}">saída.</span>`,
  descanso: `Tenha um bom descanso!`
}

const getGreetings = computed(() => {
  const { log } = dayLogStore
  if (!log.startTime) return greetings.startTime
  if (pausa.value) return greetings.pausa
  if (log.endTime) return greetings.descanso
  return greetings.endTime
})
</script>

<template lang="pug">
ModalL(v-if='dayLogStore.isLoading')
  Loading(:label='loadingLabel')
CenterL(v-else intrinsic)
  .greetings
    h1.title(v-html='getGreetings')
  StackL.content(v-if='!dayLogStore.log.endTime')
    ClientOnly
      span.time(v-if='pausa' :class='TextColor.orange') {{ timer.duration.value }}
      span.time(v-else) {{ time }}

    .input-group(v-if='!pausa || !dayLogStore.log.startTime')
      label(for='obs') Observações
      ClientOnly
        ATextarea(:rows='4' id='obs' v-model:value='obs')

    ClusterL(between)
      Button(success :disabled="dayLogStore.log.startTime" icon='feather:log-in' @click.prevent="registrarEntrada") Registrar entrada
      Button(:loading="pausa" info :disabled="!dayLogStore.log.startTime || dayLogStore.log.endTime" icon='feather:coffee' @click.prevent="registrarPausa") {{ textPausa }}
      Button(danger :disabled="!dayLogStore.log.startTime || dayLogStore.log.endTime || pausa" icon='feather:log-out' @click.prevent="registrarSaida") Registrar saída

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
