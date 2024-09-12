import { useUserStore } from '~/store/user'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser()
  const userStore = useUserStore()

  if (!user) {
    return navigateTo(`${useRuntimeConfig().public.BASE_URL}/auth/signin`, {
      external: true
    })
  }
  await userStore.setUser(user)
})
