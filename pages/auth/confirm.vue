<script setup lang="ts">
const user = useSupabaseUser()
const redirectTo = `${useRuntimeConfig().public.BASE_URL}/`
console.log(redirectTo)
watch(user, () => {
  if (user.value) {
    return navigateTo(redirectTo, { external: true })
  }
}, { immediate: true })

</script>

<template lang='pug'>
ModalL
  Loading(label='Validando usuário...')
</template>
