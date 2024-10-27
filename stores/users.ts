import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: ''
  }),
  actions: {
    setUserData(name: string, email: string) {
      this.name = name
      this.email = email
    }
  }
})

export default useUserStore
