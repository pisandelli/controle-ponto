<script lang='ts' setup>
/**
* Topbar Widget.
* @name 'WTopbar'
* @version 1.0.0
*/
const auth = useFirebaseAuth()!

function signOut() {
  auth.signOut()
  return navigateTo('/auth/signin')
}
</script>

<template lang="pug">
.topbar
  ClusterL.container(between)
    Logo.logo
    ClusterL
      //- Icon.icon(name='feather:help-circle')
      //- Icon.icon(name='feather:settings')
      Greetings
      Icon.icon(name='feather:file' title="Relatorio")
      Icon.icon(name='feather:log-out' @click='signOut')

</template>

<style lang="stylus" scoped>
.logo
  max-block-size: 2.5rem

.container
  inline-size: 100%
  max-inline-size: var(--max-width)
  margin-inline: auto
  padding: var(--gap)

.icon
  color: var(--color-secondary)
  cursor: pointer
</style>
