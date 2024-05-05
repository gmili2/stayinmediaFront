import { defineStore } from 'pinia'
import { router } from '@/plugins/router'

export const useUserStore = defineStore('auuserth', () => {
  const users=ref([])

  const getAllUser = async () => {
    const url_back = import.meta.env.VITE_BACK_URL;
    try {
      const response = await fetch(`${url_back}/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        let data= await response.json()
        users.value = data.users;
      } else {
        throw new Error('Identifiant ou mot de passe incorrect. Veuillez réessayer.');
      }
    } catch (error:any) {
      return Promise.reject(error.message);
    }
  }
  const deleteUser = async (id:any) => {
    const url_back = import.meta.env.VITE_BACK_URL;
    try {
      const response = await fetch(`${url_back}/api/users/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        let data= await response.json()
        console.log(data);
      } else {
        throw new Error('Identifiant ou mot de passe incorrect. Veuillez réessayer.');
      }
    } catch (error:any) {
      return Promise.reject(error.message);
    }
  }

  const addUser = async (user:any) => {
    const url_back = import.meta.env.VITE_BACK_URL;
    const  token= localStorage.getItem('token')
      const response = await fetch(`${url_back}/api/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token in the 'Authorization' header
        },
        body: JSON.stringify(user)
      })
      console.log(response)
      let data= await response.json()
      return (data);
  }
  return { getAllUser,deleteUser,users,addUser }
})


