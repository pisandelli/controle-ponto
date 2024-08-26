<script lang='ts' setup>
/**
* Topbar Widget.
* @name 'WTopbar'
* @version 1.0.0
*/
</script>

<template lang="pug">
.topbar
  ClusterL.container(between)
    Logo.logo
    ClusterL
      Icon.icon(name='feather:help-circle')
      Icon.icon(name='feather:settings')
      Greetings

</template>

<style lang="stylus" scoped>
.greetings
.logo
  max-block-size: 2.5rem

.container
  inline-size: 100%
  max-inline-size: var(--max-width)
  margin-inline: auto
  padding: var(--gap)

.icon
  color: var(--color-secondary)
</style>
