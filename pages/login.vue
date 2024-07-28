<script lang="ts" setup>
const supabase = useSupabaseClient()
async function handleSignInWithGoogle(response) {
  const data = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token: response.credential,
  }).then(() => {
    console.log(data)
  }).catch((error: any) => {
    throw createError({
      ...error.value,
      message: `Could not login`
    })
  })
}

</script>

<template>
  <CenterL intrinsic>
    <Card>
      <h1>FAÇA LOGO SE LOGIN AQUI NESSE CARD PARA ACESSAR O PONTO</h1>
      <div style="max-inline-size:200px">
        <div id="g_id_onload" data-client_id="722253408739-m75kgrmghav5lk7o2gqdqusvhu530e9r.apps.googleusercontent.com"
          data-context="signin" data-ux_mode="popup" data-login_uri="https://ponto.pisandelli.com" data-nonce=""
          data-auto_select="true" data-itp_support="true">
        </div>

        <div class="g_id_signin" data-type="standard" data-shape="rectangular" data-theme="filled_blue"
          data-text="signin" data-size="large" data-locale="pt-BR" data-logo_alignment="left" data-width="200px">
        </div>
      </div>
    </Card>
  </CenterL>

</template>

<style lang="stylus" scoped>

</style>