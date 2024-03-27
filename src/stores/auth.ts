import { defineStore } from 'pinia'

// export const useAutStore = defineStore('auth', {
//   state: () => {
//     return { count: 0 }
//   },
//   // could also be defined as
//   // state: () => ({ count: 0 })
//   actions: {
//     increment() {
//       this.count++
//     },
//   },
// })

export const useAutStore = defineStore('auth', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  const login = async (email, password) => {
    const auth = {
      email,
      password,
    }

    alert('toto')
    try {
      const response = await fetch('http://192.168.0.78:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auth),
      })

      if (!response.ok)
        throw new Error('Identifiant ou mot de passe incorrect. Veuillez réessayer.')
    }
    catch (error) {
      return Promise.reject(error.message)
    }
  }

  return { count, increment, login }
})
