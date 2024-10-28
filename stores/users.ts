import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUserStore = defineStore('user', () => {
  const name = ref('')
  const email = ref('')

  function setUserData(newName: string, newEmail: string) {
    name.value = newName
    email.value = newEmail
  }

  return {
    name,
    email,
    setUserData
  }
})

export default useUserStore
