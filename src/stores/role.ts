import { defineStore } from 'pinia'
import { router } from '@/plugins/router'

export const useRoleStore = defineStore('role', () => {
  const roles=ref([])

  const getAllRoles = async () => {
    const url_back = import.meta.env.VITE_BACK_URL;
    try {
      const response = await fetch(`${url_back}/api/roles`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        let data= await response.json()
        roles.value = data.roles;
      } else {
        throw new Error('Identifiant ou mot de passe incorrect. Veuillez réessayer.');
      }
    } catch (error:any) {
      return Promise.reject(error.message);
    }
  }
  const deleteRole = async (id:any) => {
    const url_back = import.meta.env.VITE_BACK_URL;
    try {
      const response = await fetch(`${url_back}/api/roles/delete/${id}`, {
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

  const addRole = async (role:any) => {
    const url_back = import.meta.env.VITE_BACK_URL;
    try {
      const response = await fetch(`${url_back}/api/role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: role
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
  return { getAllRoles,deleteRole,roles,addRole }
})


