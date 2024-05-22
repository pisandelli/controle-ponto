<script lang='ts' setup>
/**
* Custom Buttons
* @name 'CButton'
* @version 1.0.0
*/
const props = withDefaults(defineProps<{
  icon?: string
  tag?: 'button' | 'a'
}>(), {
  icon: '',
  tag: 'button'
})
</script>

<template lang="pug">
component(class='button' :is='props.tag')
  Icon(v-if='props.icon' :name='props.icon' size='1.5em')
  slot
</template>

<style lang="stylus" scoped>
$variants = primary accent success danger warning info
_variant($color)
  &[outline]
    border: 1px solid
    color: unquote('var(--color-' + $color + ')')
    background-color: transparent
    &:hover
      position: relative
      &::before
        position: absolute
        left: 0
        display: block
        block-size: 100%
        inline-size: 100%
        background-color unquote('var(--color-' + $color + ')')
        content: ' '
        border-radius: inherit
        opacity: .1
.button
  display: flex
  align-items: center
  justify-content: center
  block-size: 2rem
  border-radius: var(--border-radius)
  padding: .3rem 1rem
  font-size: .75rem
  font-weight: var(--weight-medium)
  cursor: pointer
  background-color: var(--color-primary)
  color: var(--color-neutral)
  text-transform: capitalize
  letter-spacing: 0.03125rem
  border: 0
  &:is(:hover, :focus)
    filter: saturate(160%)
  _variant(primary)

  for $color in $variants
    &[{$color}]
      background-color unquote('var(--color-' + $color + ')')
      _variant($color)

  &[warning]
    color: var(--color-default)

  &[link]
    color: var(--color-grey-400)
    background-color: transparent
    padding: 0
    font-weight: var(--weight-medium)
    &:is(:hover, :focus)
      color: var(--color-primary)

  &:has(.icon):not([icon-right])
    padding-inline-start: .6rem
    .icon
      margin-inline: 0 .4em

  &[icon-right]
    padding-inline-end: .6rem
    .icon
      margin-inline: .4rem 0
      order: 2
</style>
