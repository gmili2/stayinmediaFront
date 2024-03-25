<template>
  <div>
    <VRow class="justify-end mb-4">
      <VBtn href="add-task" color="primary">Add Task</VBtn>
    </VRow>

    <VRow>
      <VCol cols="12" md="4">
        <VCard class="h-100" :class="todoListClass" title="To Do">
          <VExpansionPanels>
            <VExpansionPanel v-for="(task, index) in todoList" :key="index">
              <v-expansion-panel-title>
                {{ task.name }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div class="custom-content">
                  <div class="user-info">
                    <img class="w-25 h-25" src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="Image utilisateur">
                    <div>User: Ahmed</div>
                  </div>
                  <div :class="{'bug-type': task.type === 'Bug'}">Type: {{ task.type }}</div>
                  <div :class="{'expired-date': isDateExpired(task.endDate)}">Date début: {{ task.startDate }}</div>
                  <div :class="{'expired-date': isDateExpired(task.endDate)}">Date fin: {{ task.endDate }}</div>
                </div>
                <VBtn class="mt-4" color="primary" @click="moveToProgress(index)">{{ progressButtonLabel }}</VBtn>
              </v-expansion-panel-text>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCard>
      </VCol>
      <VCol cols="12" md="4">
        <VCard class="h-100" :class="progressListClass" title="In Progress">
          <VExpansionPanels>
            <VExpansionPanel v-for="(task, index) in progressList" :key="index">
              <v-expansion-panel-title>
                {{ task.name }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div class="custom-content">
                  <div class="user-info">
                    <img class="w-25 h-25" src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg" alt="Image utilisateur">
                    <div>User: Ahmed</div>
                  </div>
                  <div :class="{'bug-type': task.type === 'Bug'}">Type: {{ task.type }}</div>
                  <div :class="{'expired-date': isDateExpired(task.endDate)}">Date début: {{ task.startDate }}</div>
                  <div :class="{'expired-date': isDateExpired(task.endDate)}">Date fin: {{ task.endDate }}</div>
                </div>
                <VBtn class="mt-4" color="primary" @click="moveToDone(index)">{{ doneButtonLabel }}</VBtn>
              </v-expansion-panel-text>
            </VExpansionPanel>
          </VExpansionPanels>
        </VCard>
      </VCol>
      <VCol cols="12" md="4">
        <VCard class="h-100" :class="doneListClass" title="Done">
          <!-- Affichage des tâches terminées -->
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Données initiales des tâches à faire
const todoList = ref([
  {
    type: 'Bug',
    startDate: '30/06/3000',
    endDate: '30/06/3000',
    name: 'Task 1'
  },
  {
    type: 'Feature',
    startDate: '01/01/2022',
    endDate: '02/01/2022',
    name: 'Task 2'
  },
  // Autres tâches à faire...
]);

// Liste des tâches en cours
const progressList = ref([]);

// Liste des tâches terminées
const doneList = ref([]);

// Fonction pour vérifier si la date est expirée
const isDateExpired = (date: string) => {
  return false; // Placeholder
};

// Fonction pour passer une tâche à la progression
const moveToProgress = (index: number) => {
  const taskToMove = todoList.value.splice(index, 1)[0];
  progressList.value.push(taskToMove);
};

// Fonction pour passer une tâche à "Done"
const moveToDone = (index: number) => {
  const taskToMove = progressList.value.splice(index, 1)[0];
  doneList.value.push(taskToMove);
};

// Variables pour les libellés des boutons
const progressButtonLabel = ref("Passer à la progression");
const doneButtonLabel = ref("Passer à Done");

// Classes pour les styles spécifiques à chaque liste
const todoListClass = ref("todo-list");
const progressListClass = ref("progress-list");
const doneListClass = ref("done-list");
</script>

<style scoped>
/* Styles personnalisés */
.todo-list {
  background-color: #ffd166; /* Couleur pour la liste "To Do" */
}

.progress-list {
  background-color: #06d6a0; /* Couleur pour la liste "In Progress" */
}

.done-list {
  background-color: #ef476f; /* Couleur pour la liste "Done" */
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
