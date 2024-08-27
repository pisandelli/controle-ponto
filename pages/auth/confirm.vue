<script setup lang="ts">
const user = useSupabaseUser()
console.log(redirectTo)
watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
}, { immediate: true })

</script>

<template lang='pug'>
ModalL
  Loading(label='Validando usuário...')
</template>
