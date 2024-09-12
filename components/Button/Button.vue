<script lang='ts' setup>
/**
* Custom Buttons
* @name 'Button'
* @version 1.0.0
*/
const props = defineProps<{
  icon?: string
  loading?: boolean | string
}>()
</script>

<template lang="pug">
NuxtLink(class='button')
  Icon(v-if='props.icon && !props.loading' :name='props.icon' size='1.5em')
  Icon.loader(v-if='props.loading' name='feather:loader' size='1.5em')
  slot
</template>

<style lang="stylus" scoped>
$variants = primary accent success danger warning info
.button
  display: flex
  gap: .8rem
  font-size: .85rem
  font-weight: var(--weight-medium)
  background-color: var(--color-primary)
  color: var(--color-neutral)
  letter-spacing: 0.03125rem
  padding: .5rem 1rem
  inline-size: max-content
  border-radius: var(--border-radius)
  text-decoration: none
  border: 0
  cursor: pointer
  user-select: none
  &:is(:hover, :focus)
    filter: saturate(160%)
  for $color in $variants
    &[{$color}]
      background-color unquote('var(--color-' + $color + ')')
  
  &[disabled]:not([disabled='false'])
    background-color: var(--color-gray-25)
    color: var(--color-gray-50)
    pointer-events: none
    cursor: not-allowed
  
  &[outline]:not([outline='false'])
    background-color: transparent
    border: 1px solid var(--color-primary)
    color: var(--color-primary)

.loader
  animation: rotate 2s infinite linear

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(359deg);
  }
}
</style>
