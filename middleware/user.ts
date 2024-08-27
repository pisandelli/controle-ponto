import { useUserStore } from '~/store/user'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser()
  const userStore = useUserStore()

  if (user.value) {
    await userStore.setUser(user)
  }
})
