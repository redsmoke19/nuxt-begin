import { defineStore } from 'pinia'

export default defineStore('user', () => {
  // NOTE: правильнее все таки сделать const user = ref<User.Model | null>, а уже name и email сделать как геттеры, например const name = computed<User.Model['name']>(() => user.value?.name ?? '')
  const name = ref('')
  const email = ref('')

  // NOTE: а тут уже setUserData(data: User.Model) { user.value = data }
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
