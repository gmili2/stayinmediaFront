import { defineStore } from 'pinia'
import { router } from '@/plugins/router'

export const useTaskStore = defineStore('autaskth', () => {
  const tasks=ref([])
  const tasksDone=ref([])
  const tasksInprogress=ref([])
  const tasksToDo=ref([])
  const priorities = ref([]);
  const types = ref([]);
  const statuses = ref([]);
  const owners = ref([]);

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
  const getPriorities = async () => {
    const url_back = import.meta.env.VITE_BACK_URL;
    try {
      const response = await fetch(`${url_back}/api/priorities`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        let data= await response.json()
        priorities.value = data.priorities;
      } else {
        throw new Error('Identifiant ou mot de passe incorrect. Veuillez réessayer.');
      }
    } catch (error:any) {
      return Promise.reject(error.message);
    }
  }
  const getTypes = async () => {
    const url_back = import.meta.env.VITE_BACK_URL;
    try {
      const response = await fetch(`${url_back}/api/types`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        types.value = data.types;

      } else {
        throw new Error('Failed to fetch types.');
      }
    } catch (error) {
      return Promise.reject(error.message);
    }
  };

  const getStatuses = async () => {
    const url_back = import.meta.env.VITE_BACK_URL;
    try {
      const response = await fetch(`${url_back}/api/status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        statuses.value = data.status;

      } else {
        throw new Error('Failed to fetch statuses.');
      }
    } catch (error) {
      return Promise.reject(error.message);
    }
  };

  const getOwners = async () => {
    const url_back = import.meta.env.VITE_BACK_URL;
    try {
      const response = await fetch(`${url_back}/api/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        owners.value = data.users;
      } else {
        throw new Error('Failed to fetch owners.');
      }
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
return { getAllTaskById,deleteTask,editTask,tasks,addTask,tasksToDo,tasksInprogress,tasksDone,    getPriorities,
    priorities,
    getTypes,
    types,
    getStatuses,
    statuses,
    getOwners,
    owners,
}
});

