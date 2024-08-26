<script lang='ts' setup>
/**
* A greetings with an avatar.
* @name 'Greetings'
* @version 1.0.0
*/
import { useUserStore } from '~/store/user'
const userStore = useUserStore()
const { username, avatar } = userStore.user || {}
</script>

<template lang="pug">
ClusterL(narrow)
  p.greetings {{ username }}
  Avatar(:path='avatar')
</template>

<style lang="stylus" scoped>
.greetings
  font-weight: var(--weight-light)
</style>
