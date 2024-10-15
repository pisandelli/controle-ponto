<script lang='ts' setup>
/**
* Loader component.
* @name 'Loading'
* @version 1.0.0
*/
withDefaults(defineProps<{
  label: string
}>(), {
  label: 'Carregando...'
})
</script>

<template lang="pug">
CenterL.loading(intrinsic)
  Icon.loader(name='feather:loader' size='4.5rem')
  p {{ label }}
</template>

<style lang="stylus" scoped>
.loading
  color: var(--color-secondary)
.loader
  animation: rotate 2s infinite linear
  margin-block-end: 1rem

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(359deg);
  }
}
</style>
