<script lang='ts' setup>
/**
* Small Avatar Component.
* @name 'Avatar'
* @version 1.0.0
*/

defineProps<{
  path?: string
}>()
</script>

<template lang="pug">
.avatar(v-if='path')
  NuxtImg(:src='path' alt='Avatar')
</template>

<style lang="stylus" scoped>
.avatar
  --avatar-size: 2.5rem
  block-size: var(--avatar-size)
  aspect-ratio: 1 / 1
  border-radius: 100%
  overflow: clip
</style>
