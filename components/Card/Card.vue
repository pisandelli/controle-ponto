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
  border: 1px solid var(--card_border-color, #ccc )
  border-radius: var(--border-radius, 0.5rem)
</style>
