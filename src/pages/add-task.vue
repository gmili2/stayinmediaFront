<script setup lang="ts">
import AddTaskForm from '@/views/pages/form-layouts/AddTaskForm.vue'

const totalProfit = {
  title: 'Total Profit',
  color: 'secondary',
  icon: 'ri-pie-chart-2-line',
  stats: '$25.6k',
  change: 42,
  subtitle: 'Weekly Project',
}

const newProject = {
  title: 'New Project',
  color: 'primary',
  icon: 'ri-file-word-2-line',
  stats: '862',
  change: -18,
  subtitle: 'Yearly Project',
}
</script>

<template>
  <VCard title="Add task">
    <VCardText>
      <AddTaskForm />
    </VCardText>
  </VCard>
</template>
