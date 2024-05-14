<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@/components/Modal.vue'
import AddTaskForm from '@/views/pages/form-layouts/AddTaskForm.vue'
import {useTaskStore} from "@/stores/task";
import CardTask from "@/views/pages/cards/cardTask.vue";
import EditTaskForm from "@/views/pages/form-layouts/EditTaskForm.vue";

const showModal = ref(false)
const showModalEdit = ref(false)
const isLoading = ref(false)
const allTasks = ref([])
const  getAllTasks=async () => {
  isLoading.value=true
  await useTaskStore().getAllTaskById("TODO");
  await useTaskStore().getAllTaskById("IN_PROGRESS");
  await useTaskStore().getAllTaskById('DONE');
  allTasks.value=useTaskStore().tasks;
  isLoading.value=false
}
getAllTasks();
// Données initiales des tâches à faire
const todoList = ref([
  {
    type: 'Bug',
    startDate: '30/06/3000',
    endDate: '30/06/3000',
    name: 'Task 1',
  },
  {
    type: 'Feature',
    startDate: '01/01/2022',
    endDate: '02/01/2022',
    name: 'Task 2',
  },

  // Autres tâches à faire...
])

// Liste des tâches en cours
const progressList = ref([])

// Liste des tâches terminées
const doneList = ref([])

// Fonction pour vérifier si la date est expirée
const isDateExpired = (date: string) => {
  return false // Placeholder
}

// Fonction pour passer une tâche à la progression
const moveToProgress = (index: number) => {
  const taskToMove = todoList.value.splice(index, 1)[0]

  progressList.value.push(taskToMove)
}

// Fonction pour passer une tâche à "Done"
const moveToDone = (index: number) => {
  const taskToMove = progressList.value.splice(index, 1)[0]

  doneList.value.push(taskToMove)
}

const progressButtonLabel = ref('Passer à la progression')
const doneButtonLabel = ref('Passer à Done')

const todoListClass = ref('todo-list')
const progressListClass = ref('progress-list')
const doneListClass = ref('done-list')
const taskAEdit=ref<any>();
function  showModalEditTask (task:any){
  showModalEdit.value=true
  taskAEdit.value= {...task}
}


</script>

<template>
  <div>
    <VRow class="justify-end mb-4">
      <VBtn
        color="primary"
        @click="showModal = true"
      >
        Add Task
      </VBtn>
    </VRow>
    <Teleport to="body">
      <Modal
        :show="showModal"
        @close="showModal = false"
      >
        <template #header>
          <h3>Add task</h3>
        </template>
        <template #body>
          <VCard>
            <VCardText>
              <AddTaskForm @handle-submit="showModal=false"/>
            </VCardText>
          </VCard>
        </template>
      </Modal>
    </Teleport>
    <VRow>
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          class="h-100"
          :class="todoListClass"
          title="To Do"
        >
          <VExpansionPanels>
            <VExpansionPanel
              v-for="(task, index) in useTaskStore().tasksToDo"
              :key="index"
            >
              <VExpansionPanelTitle>
                  <div class="w-64">
                    <div>{{ task.name }}</div>
                    <div>{{ task.type }}</div>
                  </div>
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <card-task :Task="task"  @edit-task="showModalEditTask(task)"></card-task>
              </VExpansionPanelText>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          class="h-100"
          :class="progressListClass"
          title="In Progress"
        >
          <VExpansionPanels>
            <VExpansionPanel
              v-for="(task, index) in useTaskStore().tasksInprogress"
              :key="index"
            >
              <VExpansionPanelTitle>
                {{ task.name }}
              </VExpansionPanelTitle>
              <card-task :Task="task"></card-task>

            </VExpansionPanel>
          </VExpansionPanels>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="4"
      >
        <VCard
          class="h-100"
          :class="doneListClass"
          title="Done"
        >
          <VExpansionPanels>
            <VExpansionPanel
              v-for="(task, index) in useTaskStore().tasksDone"
              :key="index"
            >
              <VExpansionPanelTitle>
                {{ task.name }}
              </VExpansionPanelTitle>
              <card-task :Task="task" @edit-task="showModalEditTask()"></card-task>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCard>
      </VCol>
    </VRow>
    <Teleport to="body">
      <Modal
        :show="showModalEdit"
        @close="showModalEdit = false"
      >
        <template #header>
          <h3>Edit task</h3>
        </template>
        <template #body>
          <VCard>
            <VCardText>
              <EditTaskForm @handle-submit="showModalEdit=false" :task="taskAEdit"/>
            </VCardText>
          </VCard>
        </template>
      </Modal>
    </Teleport>
  </div>
</template>

<style scoped>
/* Styles personnalisés */
.todo-list {
  background-color: #b7d0ba; /* Couleur pour la liste "To Do" */
}

.progress-list {
  background-color: #86cb93; /* Couleur pour la liste "In Progress" */
}

.done-list {
  background-color: #3dc94a; /* Couleur pour la liste "Done" */
}

/* Style du fond du modal */
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Couleur de fond semi-transparente */
  z-index: 999; /* S'assurer que le fond du modal est au-dessus de tout le reste */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Style du modal lui-même */
.modal {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); /* Ombre portée pour une apparence de profondeur */
}

/* Style du texte de fermeture */
.modal::after {
  content: "click outside this modal to close";
  display: block;
  font-size: 12px;
  color: gray;
  margin-top: 10px;
}

/* Masquer le modal par défaut */
.modal-bg {
  display: none;
}

/* Afficher le modal lorsque isOpen est vrai */
.modal-bg[v-if="isOpen"] {
  display: flex;
}

.custom-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.user-info {
  display: flex;
  align-items: center;
}
.bug-type {
  color: red;
}
.expired-date {
  color: green; /* Couleur de la date expirée */
}
</style>
