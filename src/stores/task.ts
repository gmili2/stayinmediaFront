import { defineStore } from 'pinia'
import { router } from '@/plugins/router'

export const useTaskStore = defineStore('autaskth', () => {
  const tasks=ref([])
  const tasksDone=ref([])
  const tasksInprogress=ref([])
  const tasksToDo=ref([])

  const getAllTaskById = async (code:string) => {
    const url_back = import.meta.env.VITE_BACK_URL;
    try {
      const response = await fetch(`${url_back}/api/tasks/status/${code}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        let data= await response.json()
        console.log('ta')
        if("TODO"==code)
        tasksToDo.value = data.tasks;
        if("IN_PROGRESS"==code)
          tasksInprogress.value = data.tasks;
        if("DONE"==code)
          tasksDone.value = data.tasks;
      } else {
        throw new Error('Identifiant ou mot de passe incorrect. Veuillez réessayer.');
      }
    } catch (error:any) {
      return Promise.reject(error.message);
    }
  }
  const deleteTask = async (id:any) => {
    const url_back = import.meta.env.VITE_BACK_URL;
    try {
      const response = await fetch(`${url_back}/api/tasks/delete/${id}`, {
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

  const addTask = async (task:any) => {
    const url_back = import.meta.env.VITE_BACK_URL;

      const response = await fetch(`${url_back}/api/task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
      })
    let data= await response.json()
    return data;
  }

  const editTask = async (task:any) => {
    alert(task.id)
    const url_back = import.meta.env.VITE_BACK_URL;

    const response = await fetch(`${url_back}/api/task/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task)
    })
    let data= await response.json()
    return data;
  }
  return { getAllTaskById,deleteTask,editTask,tasks,addTask,tasksToDo,tasksInprogress,tasksDone }
})


