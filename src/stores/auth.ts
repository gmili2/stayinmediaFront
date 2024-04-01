import { defineStore } from 'pinia'
import { router } from '@/plugins/router'

export const useAutStore = defineStore('auth', () => {
  const count = ref(0)
  const user=ref({rolse:null,isLogin:false})

  const login = async (email:string, password:string) => {
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
      })

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
            setUser(data2);
          }
        }

        localStorage.setItem('token', token);

        return response;
      } else {
        throw new Error('Identifiant ou mot de passe incorrect. Veuillez réessayer.');
      }
    } catch (error:any) {
      return Promise.reject(error.message);
    }
  }
  const setUser=(data2:any) =>{
    user.roles= data2.token_decoded.roles;
    user.email= data2.token_decoded.email;
    user.username= data2.token_decoded.username;
    user.id= data2.token_decoded.id;
    user.photo= data2.token_decoded.photo;
    user.isLogin=true;
    localStorage.setItem('user', JSON.stringify(user));
  }

  return { user,login,setUser }
})


