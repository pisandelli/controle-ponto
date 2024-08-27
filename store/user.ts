import type { User as UserType } from '~/Types/User'
export const useUserStore = defineStore('user', () => {
  const user = ref<UserType | null>(null)

  async function setUser(userData: any) {
    user.value = {
      username: userData.value.user_metadata.name,
      email: userData.value.user_metadata.email,
      avatar: userData.value.user_metadata.avatar_url,
      createdAt: userData.value.created_at,
      updatedAt: userData.value.updated_at
    }
  }

  return {
    user,
    setUser
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
