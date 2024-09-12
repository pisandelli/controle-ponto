<script lang="ts" setup>
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const auth = useFirebaseAuth()!
function signInWithGoogle() {
  signInWithPopup(auth, new GoogleAuthProvider())
    .then(() => {
      navigateTo('/');
      return;
    })
    .catch((error) => {
      console.error('Erro durante o login:', error);
    });
}

definePageMeta({
  layout: 'signin'
})

</script>

<template lang='pug'>
StackL
  StackL(squeezed)
    h1.title Login 
    p.sub-title Faça seu login com sua conta da Pisandelli
  Button(@click='signInWithGoogle' icon='logos:google-icon' outline) Login com Google
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