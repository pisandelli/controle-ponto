import type { User as UserType } from '~/Types/User'
export const useUserStore = defineStore('user', () => {
  const user = ref<UserType | null>(null)

  async function setUser(userData: any) {
    user.value = {
      username: userData.displayName,
      email: userData.email,
      avatar: userData.photoURL,
      createdAt: userData.createdAt,
      updatedAt: userData.lastLoginAt
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
