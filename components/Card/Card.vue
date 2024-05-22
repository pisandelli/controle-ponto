<script lang='ts' setup>
/**
* A simple card component.
* @name 'Simple Card'
* @version 1.0.0
*/
</script>

<template lang="pug">
BoxL.card
  slot
</template>

<style lang="stylus" scoped>
.card
  border-width: var(--card_border-thick, 0)
  border-style: var(--card_border-style, none)
  border-color: var(--card_border-color, unset)
  border-radius: var(--card_border-radius, var(--border-radius, 0.5rem))
  _box-shadow()
</style>