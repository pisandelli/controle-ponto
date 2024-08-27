<script setup lang="ts">
const user = useSupabaseUser()
const redirectTo = `${useRuntimeConfig().public.BASE_URL}/`
watch(user, () => {
  if (user.value) {
    return navigateTo(redirectTo)
  }
}, { immediate: true })

</script>

<template lang='pug'>
ModalL
  Loading(label='Validando usuário...')
</template>
