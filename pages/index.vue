<script lang='ts' setup>
/**
* Index Page.
* @name 'PageIndex'
* @version 1.0.0
*/

</script>

<template lang="pug">
StackL.container(squeezed)
  ClusterL(narrow)
    .box(style='background-color: var(--color-primary-25)'): small primary-2
    .box(style='background-color: var(--color-primary-50)'): small primary-50 
    .box(style='background-color: var(--color-primary-75)'): small primary-75 
    .box(style='background-color: var(--color-primary)'): small primary 
    .box(style='background-color: var(--color-primary-dark-25)'): small primary-dark-25 
    .box(style='background-color: var(--color-primary-dark-50)'): small primary-dark-50 
    .box(style='background-color: var(--color-primary-dark-75)'): small primary-dark-75 
  ClusterL(narrow)
    .box(style='background-color: var(--color-secondary-25)'): small secondary-25 
    .box(style='background-color: var(--color-secondary-50)'): small secondary-50 
    .box(style='background-color: var(--color-secondary-75)'): small secondary-75 
    .box(style='background-color: var(--color-secondary)'): small secondary 
    .box(style='background-color: var(--color-secondary-dark-25)'): small secondary-dark-25 
    .box(style='background-color: var(--color-secondary-dark-50)'): small secondary-dark-50 
    .box(style='background-color: var(--color-secondary-dark-75)'): small secondary-dark-75 
  ClusterL(narrow)
    .box(style='background-color: var(--color-accent-25)'): small accent-25 
    .box(style='background-color: var(--color-accent-50)'): small accent-50 
    .box(style='background-color: var(--color-accent-75)'): small accent-75 
    .box(style='background-color: var(--color-accent)'): small accent 
    .box(style='background-color: var(--color-accent-dark-25)'): small accent-dark-25 
    .box(style='background-color: var(--color-accent-dark-50)'): small accent-dark-50 
    .box(style='background-color: var(--color-accent-dark-75)'): small accent-dark-75 
  ClusterL(narrow)
    .box(style='background-color: var(--color-success-25)'): small success-25 
    .box(style='background-color: var(--color-success-50)'): small success-50 
    .box(style='background-color: var(--color-success-75)'): small success-75 
    .box(style='background-color: var(--color-success)'): small success 
    .box(style='background-color: var(--color-success-dark-25)'): small success-dark-25 
    .box(style='background-color: var(--color-success-dark-50)'): small success-dark-50 
    .box(style='background-color: var(--color-success-dark-75)'): small success-dark-75 
  ClusterL(narrow)
    .box(style='background-color: var(--color-warning-25)'): small warning-25 
    .box(style='background-color: var(--color-warning-50)'): small warning-50 
    .box(style='background-color: var(--color-warning-75)'): small warning-75 
    .box(style='background-color: var(--color-warning)'): small warning 
    .box(style='background-color: var(--color-warning-dark-25)'): small warning-dark-25 
    .box(style='background-color: var(--color-warning-dark-50)'): small warning-dark-50 
    .box(style='background-color: var(--color-warning-dark-75)'): small warning-dark-75 
  ClusterL(narrow)
    .box(style='background-color: var(--color-danger-25)'): small danger-25 
    .box(style='background-color: var(--color-danger-50)'): small danger-50 
    .box(style='background-color: var(--color-danger-75)'): small danger-75 
    .box(style='background-color: var(--color-danger)'): small danger 
    .box(style='background-color: var(--color-danger-dark-25)'): small danger-dark-25 
    .box(style='background-color: var(--color-danger-dark-50)'): small danger-dark-50 
    .box(style='background-color: var(--color-danger-dark-75)'): small danger-dark-75 
  ClusterL(narrow)
    .box(style='background-color: var(--color-info-25)'): small info-25 
    .box(style='background-color: var(--color-info-50)'): small info-50 
    .box(style='background-color: var(--color-info-75)'): small info-75 
    .box(style='background-color: var(--color-info)'): small info 
    .box(style='background-color: var(--color-info-dark-25)'): small info-dark-25 
    .box(style='background-color: var(--color-info-dark-50)'): small info-dark-50 
    .box(style='background-color: var(--color-info-dark-75)'): small info-dark-75 
  ClusterL(narrow)
    .box(style='background-color: var(--color-gray-25)'): small gray-25 
    .box(style='background-color: var(--color-gray-50)'): small gray-50 
    .box(style='background-color: var(--color-gray-75)'): small gray-75 
    .box(style='background-color: var(--color-gray)'): small gray 
    .box(style='background-color: var(--color-gray-dark-25)'): small gray-dark-25 
    .box(style='background-color: var(--color-gray-dark-50)'): small gray-dark-50 
    .box(style='background-color: var(--color-gray-dark-75)'): small gray-dark-75 

</template>
<style lang='stylus' scoped>
.container
  --clusterl-gap: 0 
.box
  inline-size: 100px
  aspect-ratio: 1 / 1
</style>
