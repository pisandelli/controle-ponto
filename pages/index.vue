<script lang='ts' setup>
/**
* Index Page.
* @name 'PageIndex'
* @version 1.0.0
*/
const time = useCurrentTime()
</script>

<template lang="pug">
CenterL(intrinsic)
  StackL
    span.time {{ time }}
    .greetings
      h1.title Registre sua <span class='in'>entrada</span>
  Button(success) Registrar entrada

</template>
<style lang='stylus' scoped>
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
  color: vaR(--color-success)
</style>
