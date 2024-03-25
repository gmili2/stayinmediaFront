import { defineStore } from 'pinia'
import {decode} from '@/utils/decodeToken';
import { router } from '@/plugins/router'
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
    const url_back = import.meta.env.VITE_BACK_URL;
    const auth = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch(`${url_back}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auth),
      });

      if (response.ok) {
        // Parse the JSON response body
        const data = await response.json();
        // Extract the token from the parsed JSON object
        const token = data.token;

        if(token){
          const response2 = await fetch(`${url_back}/api/token/decode?token=${token}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data2 = await response2.json();
          if (data2.token_decoded){
            router.push({ name: "Dashboard" });
          }
        }



        localStorage.setItem('token', token);

        // You can also return the token if needed
        return token;
      } else {
        throw new Error('Identifiant ou mot de passe incorrect. Veuillez réessayer.');
      }
    } catch (error:any) {
      return Promise.reject(error.message);
    }
  }
  return { count, increment,login }
})
