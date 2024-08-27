<script lang="ts" setup>
const user = useSupabaseUser()
const { auth } = useSupabaseClient()
const redirectTo = `${useRuntimeConfig().public.BASE_URL}/auth/confirm`
console.log(redirectTo)
/**
 * Handles the sign-in process with Google OAuth.
 * This function is called when the user clicks the "Sign in with Google" button.
 * It uses the Supabase client to initiate the Google OAuth flow, and redirects the user to the specified redirect URI.
 * If an error occurs during the sign-in process, it throws a new error with the error message.
 */
const handleSignInWithGoogle = async () => {
  const { error } = await auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo }
  })

  if (error) {
    throw createError({
      ...error,
      message: `Não foi possível fazer o login com o Google. ${error.message}`
    })
  }
}

/**
 * Watches for changes to the current user and redirects to the home page if a user is logged in.
 * This function is executed whenever the `user` reactive variable changes.
 */
watchEffect(async () => {
  if (user.value) {
    const { error } = await auth.getUser()
    if (error) {
      throw createError({
        ...error,
        message: `Ocorreu um erro com a sua sessão. ${error.message}`
      })
    }
    navigateTo('/')
  }
})

definePageMeta({
  layout: 'signin'
})

</script>

<template lang='pug'>
StackL(compact)
  StackL(squeezed)
    h1.title Login 
    p.sub-title Faça seu login com sua conta da Pisandelli
  div#g_id_onload(data-client_id="722253408739-m75kgrmghav5lk7o2gqdqusvhu530e9r.apps.googleusercontent.com"
    data-context="signin" data-ux_mode="redirect" :data-login_uri="redirectTo" data-auto_prompt="false")

  div.g_id_signin(data-type="standard" data-shape="rectangular" data-theme="filled_blue"
    data-text="signin" data-size="large" data-logo_alignment="left" data-width="250"
    @click="handleSignInWithGoogle")
</template>

<style lang="stylus" scoped>
.title
  font-size: var(--font-size-big)
  text-transform: uppercase
  font-weight: var(--weight-bold)
  color: var(--color-primary)

.sub-title
  font-size: var(--font-size-small)
</style>