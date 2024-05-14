
<template>
  <div class="task-card">
    <h2>Nom de la tâche</h2>
    <div class="owner flex-row">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkIh30VvD43t3klQ2XZw4M3204XqLmnD95bQ&s" alt="Nom du propriétaire">
      <p>{{ Task.name}}</p>
      <div  style="display: flex" class="w-100  justify-end"
      >
        <VCard width="40px" height="40px">
          <VCardText >
            <VIcon
              @click="editTaskFunction()"
              size="20"
              icon="ri-edit-line"
            />
          </VCardText>
        </VCard>
      </div>
    </div>
    <div class="task-details">
      <p><strong>Type de tâche:</strong> {{ Task.type}}</p>
      <p><strong>Date de début:</strong> <span style="color: green;">{{ Task.start_date}}</span></p>
      <p><strong>Date de fin:</strong> <span style="color: red;">{{ Task.end_date}}</span></p>
      <p><strong>Priorité:</strong> {{ Task.priority}}</p>
      <VBtn
        class="mt-4"
        color="primary"
      >
        In progress
      </VBtn>
    </div>
  </div>
</template>
<script setup lang="ts">
  import {defineEmits} from "vue";

  const showModal = ref(false);
  const emit = defineEmits(['editTask'])

  function  editTaskFunction(){
    emit('editTask');
  }

  defineProps({
Task: {
  type: Object,
  required: true
}
  })
</script>
<style>
.task-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.task-card h2 {
  font-size: 1.2em;
  margin-bottom: 10px;
}
.owner{
  display: flex;
}
.owner img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
}
.owner p {
  display: inline-block;
  vertical-align: middle;
}
.task-details {
  margin-top: 10px;
}
.task-details p {
  margin-bottom: 5px;
}
.task-details strong {
  font-weight: bold;
}
.edit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.edit-button i {
  margin-right: 5px;
}
</style>
