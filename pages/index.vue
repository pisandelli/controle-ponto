<script lang='ts' setup>
/**
* Index Page.
* @name 'PageIndex'
* @version 1.0.0
*/
const time = useCurrentTime()
</script>

<template lang="pug">
CenterL
  CenterL(intrinsic)
    span.time {{ time }}
    StackL.content
      .greetings
        h1.title Registre sua <span class='in'>entrada</span>

      .input-group
        label(for='obs') Observações
        ATextarea(:rows='4' id='obs')

      ClusterL(between)
        Button(success to='#' icon='feather:log-in') Registrar entrada
        Button(warning to='#' icon='feather:coffee') Registrar pausa
        Button(danger to='#' icon='feather:log-out') Registrar saída

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
