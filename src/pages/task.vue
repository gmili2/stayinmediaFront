<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import Modal from '@/components/Modal.vue'
import AddTaskForm from '@/views/pages/form-layouts/AddTaskForm.vue'
import { useTaskStore } from '@/stores/task'
import CardTask from '@/views/pages/cards/cardTask.vue'
import EditTaskForm from '@/views/pages/form-layouts/EditTaskForm.vue'

const showModal = ref(false)
const showModalEdit = ref(false)
const isLoading = ref(false)
const allTasks = ref([])
const taskStore = useTaskStore()
const taskToEdit = ref<any>(null)
const taskAEdit = ref<any>()

// Fetch tasks and foreign keys
const getAllTasks = async () => {
  isLoading.value = true
  await taskStore.getAllTaskById('TODO')
  await taskStore.getAllTaskById('IN_PROGRESS')
  await taskStore.getAllTaskById('DONE')
  allTasks.value = taskStore.tasks
  isLoading.value = false
}

const getAllForeignKeys = async () => {
  isLoading.value = true
  await taskStore.getPriorities()
  await taskStore.getTypes()
  await taskStore.getStatuses()
  await taskStore.getOwners()
  isLoading.value = false
}

// Mapped foreign key data
const mappedPriorities = computed(() => taskStore.priorities.map(priority => ({ title: priority.label, value: priority.id })))
const mappedTypes = computed(() => taskStore.types.map(type => ({ title: type.label, value: type.id })))
const mappedStatuses = computed(() => taskStore.statuses.map(status => ({ title: status.label, value: status.id })))
const mappedOwners = computed(() => taskStore.owners.map(owner => ({ title: owner.username, value: owner.id })))



// Task Lists
const todoList = computed(() => taskStore.tasksToDo)
const progressList = computed(() => taskStore.tasksInprogress)
const doneList = computed(() => taskStore.tasksDone)

const searchTasksForm = reactive({
  priority: null,
  status: null,
  type: null,
  owner: null,
})

const searchTasks =async () => {
  isLoading.value = true

  const query = {
    priority: searchTasksForm.priority.join(','),
    status: searchTasksForm.status.join(','),
    type: searchTasksForm.type.join(','),
    owner: searchTasksForm.owner.join(',')
  }

  const queryString = new URLSearchParams(query).toString()

  await taskStore.getAllTaskByMultiCriteria(queryString)

  allTasks.value = taskStore.tasks
  isLoading.value = false


};
// Move task between lists
const moveToProgress = (index: number) => {
  const taskToMove = todoList.value.splice(index, 1)[0]

  progressList.value.push(taskToMove)
}

const moveToDone = (index: number) => {
  const taskToMove = progressList.value.splice(index, 1)[0]

  doneList.value.push(taskToMove)
}

// Show edit task modal
const showModalEditTask = (task: any) => {
  showModalEdit.value = true
  taskToEdit.value = { ...task }
}

// Lifecycle hook
onBeforeMount(() => {
  getAllTasks()
  getAllForeignKeys()
})
</script>

<template>
  <div>
    <VRow class="flex align-content-center justify-space-between mb-4">
      <VCol>
        <VSelect
          v-model="searchTasksForm.priority"
          :items="mappedPriorities"
          item-title="title"
          item-value="value"
          label="Select Priority"
          multiple
        >
          <template #selection="{ item, index }">
            <VChip v-if="index < 2">
              <span>{{ item.title }}</span>
            </VChip>
            <span
              v-if="index === 2"
              class="text-grey text-caption align-self-center"
            >
            (+{{ searchTasksForm.priority.length - 2 }} others)
          </span>
          </template>
        </VSelect>
      </VCol>
      <VCol>
        <VSelect
          v-model="searchTasksForm.type"
          :items="mappedTypes"
          item-title="title"
          item-value="value"
          label="Select Type"
          multiple
        >
          <template #selection="{ item, index }">
            <VChip v-if="index < 2">
              <span>{{ item.title }}</span>
            </VChip>
            <span
              v-if="index === 2"
              class="text-grey text-caption align-self-center"
            >
            (+{{ searchTasksForm.type.length - 2 }} others)
          </span>
          </template>
        </VSelect>
      </VCol>
      <VCol>
        <VSelect
          v-model="searchTasksForm.status"
          :items="mappedStatuses"
          item-title="title"
          item-value="value"
          label="Select Status"
          multiple
        >
          <template #selection="{ item, index }">
            <VChip v-if="index < 2">
              <span>{{ item.title }}</span>
            </VChip>
            <span
              v-if="index === 2"
              class="text-grey text-caption align-self-center"
            >
            (+{{ searchTasksForm.status.length - 2 }} others)
          </span>
          </template>
        </VSelect>
      </VCol>
      <VCol>
        <VSelect
          v-model="searchTasksForm.owner"
          :items="mappedOwners"
          item-title="title"
          item-value="value"
          label="Select Owner"
          multiple
        >
          <template #selection="{ item, index }">
            <VChip v-if="index < 2">
              <span>{{ item.title }}</span>
            </VChip>
            <span
              v-if="index === 2"
              class="text-grey text-caption align-self-center"
            >
            (+{{ searchTasksForm.owner.length - 2 }} others)
          </span>
          </template>
        </VSelect>
      </VCol>
      <VCol>
        <IconBtn @click="searchTasks">
          <VIcon icon="ri-search-line" />
        </IconBtn>
      </VCol>
      <VCol class="d-flex justify-end">
        <VBtn
          color="primary"
          @click="showModal = true"
        >
          Add Task
        </VBtn>
      </VCol>
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
              <AddTaskForm @handle-submit="showModal = false" />
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
          :title="`To Do (${useTaskStore().tasksToDo.length})`"
        >
          <VDivider class="my-4" />
          <template #append>
            <VAvatar
              color="surface-light"
              size="32"
            >
              <svg
                width="64px"
                height="64px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              ><g
                id="SVGRepo_bgCarrier"
                stroke-width="0"
              /><g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              /><g id="SVGRepo_iconCarrier"> <path
                d="M3.83327 15.2485L4.56432 15.0809L3.83327 15.2485ZM3.83327 9.35323L4.56432 9.52078L3.83327 9.35323ZM20.1667 9.35323L19.4357 9.52079L20.1667 9.35323ZM20.1667 15.2485L19.4357 15.0809L20.1667 15.2485ZM14.8801 20.6589L15.0552 21.3882L14.8801 20.6589ZM9.11986 20.6589L9.29493 19.9296L9.11986 20.6589ZM9.11985 3.94279L9.29493 4.67207L9.11985 3.94279ZM14.8801 3.94279L15.0552 3.21351L14.8801 3.94279ZM8.82008 3C8.82008 2.58579 8.48429 2.25 8.07008 2.25C7.65587 2.25 7.32008 2.58579 7.32008 3H8.82008ZM7.32008 5.51375C7.32008 5.92796 7.65587 6.26375 8.07008 6.26375C8.48429 6.26375 8.82008 5.92796 8.82008 5.51375H7.32008ZM16.6799 3C16.6799 2.58579 16.3441 2.25 15.9299 2.25C15.5157 2.25 15.1799 2.58579 15.1799 3H16.6799ZM15.1799 5.51375C15.1799 5.92796 15.5157 6.26375 15.9299 6.26375C16.3441 6.26375 16.6799 5.92796 16.6799 5.51375H15.1799ZM4.56432 15.0809C4.14523 13.2524 4.14523 11.3493 4.56432 9.52078L3.10223 9.18568C2.63259 11.2347 2.63259 13.367 3.10223 15.416L4.56432 15.0809ZM19.4357 9.52079C19.8548 11.3493 19.8548 13.2524 19.4357 15.0809L20.8978 15.416C21.3674 13.367 21.3674 11.2347 20.8978 9.18568L19.4357 9.52079ZM14.7051 19.9296C12.9258 20.3568 11.0742 20.3568 9.29493 19.9296L8.94478 21.3882C10.9543 21.8706 13.0458 21.8706 15.0552 21.3882L14.7051 19.9296ZM9.29493 4.67207C11.0742 4.24493 12.9258 4.24493 14.7051 4.67207L15.0552 3.21351C13.0458 2.73111 10.9542 2.73111 8.94478 3.21351L9.29493 4.67207ZM9.29493 19.9296C6.95607 19.3682 5.11769 17.4953 4.56432 15.0809L3.10223 15.416C3.77946 18.3708 6.03739 20.6902 8.94478 21.3882L9.29493 19.9296ZM15.0552 21.3882C17.9626 20.6902 20.2205 18.3708 20.8978 15.416L19.4357 15.0809C18.8823 17.4953 17.0439 19.3682 14.7051 19.9296L15.0552 21.3882ZM14.7051 4.67207C17.0439 5.23355 18.8823 7.10642 19.4357 9.52079L20.8978 9.18568C20.2205 6.23089 17.9626 3.91147 15.0552 3.21351L14.7051 4.67207ZM8.94478 3.21351C6.03739 3.91147 3.77946 6.23089 3.10223 9.18568L4.56432 9.52078C5.11769 7.10641 6.95607 5.23355 9.29493 4.67207L8.94478 3.21351ZM7.32008 3V5.51375H8.82008V3H7.32008ZM15.1799 3V5.51375H16.6799V3H15.1799Z"
                fill="#363853"
              /> <path
                d="M7.98809 10.2877C7.6736 10.0181 7.20012 10.0546 6.93056 10.369C6.66099 10.6835 6.69741 11.157 7.01191 11.4266L7.98809 10.2877ZM8.5 11.7143L8.01191 12.2837C8.29277 12.5245 8.70723 12.5245 8.98809 12.2837L8.5 11.7143ZM10.9881 10.5694C11.3026 10.2999 11.339 9.8264 11.0694 9.51191C10.7999 9.19741 10.3264 9.16099 10.0119 9.43056L10.9881 10.5694ZM7.98809 14.5734C7.6736 14.3038 7.20012 14.3403 6.93056 14.6548C6.66099 14.9693 6.69741 15.4427 7.01191 15.7123L7.98809 14.5734ZM8.5 16L8.01191 16.5694C8.29277 16.8102 8.70723 16.8102 8.98809 16.5694L8.5 16ZM10.9881 14.8552C11.3026 14.5856 11.339 14.1121 11.0694 13.7976C10.7999 13.4831 10.3264 13.4467 10.0119 13.7163L10.9881 14.8552ZM13 10.5357C12.5858 10.5357 12.25 10.8715 12.25 11.2857C12.25 11.6999 12.5858 12.0357 13 12.0357V10.5357ZM16.5 12.0357C16.9142 12.0357 17.25 11.6999 17.25 11.2857C17.25 10.8715 16.9142 10.5357 16.5 10.5357V12.0357ZM13 14.8214C12.5858 14.8214 12.25 15.1572 12.25 15.5714C12.25 15.9856 12.5858 16.3214 13 16.3214V14.8214ZM16.5 16.3214C16.9142 16.3214 17.25 15.9856 17.25 15.5714C17.25 15.1572 16.9142 14.8214 16.5 14.8214V16.3214ZM7.01191 11.4266L8.01191 12.2837L8.98809 11.1448L7.98809 10.2877L7.01191 11.4266ZM8.98809 12.2837L10.9881 10.5694L10.0119 9.43056L8.01191 11.1448L8.98809 12.2837ZM7.01191 15.7123L8.01191 16.5694L8.98809 15.4306L7.98809 14.5734L7.01191 15.7123ZM8.98809 16.5694L10.9881 14.8552L10.0119 13.7163L8.01191 15.4306L8.98809 16.5694ZM13 12.0357H16.5V10.5357H13V12.0357ZM13 16.3214H16.5V14.8214H13V16.3214Z"
                fill="#363853"
              /> </g></svg>
            </VAvatar>
          </template>

          <VExpansionPanels>
            <VExpansionPanel
              v-for="(task, index) in useTaskStore().tasksToDo"
              :key="index"
            >
              <VExpansionPanelTitle>
                <VCard
                  class="mx-auto w-100"
                  color="#36393f"
                  min-height="100"
                  theme="dark"
                  variant="flat"
                >
                  <VCard
                    class="w-100"
                    color="#2f3136"
                    rounded="lg"
                    variant="flat"
                  >
                    <VCardItem>
                      <VCardTitle class="text-body-2 d-flex align-center">
                        <VSpacer />
                        <VAvatar
                          :image="task?.owner.photo"
                          size="x-small"
                        />
                      </VCardTitle>
                      <VTimeline
                        direction="horizontal"
                        line-inset="12"
                      >
                        <VTimelineItem size="small">
                          <template v-slot:opposite>
                            Start Date
                          </template>
                          <div class="d-flex">
                            <div>
                              <div class="text-caption mb-2">
                                {{ task?.start_date }}
                              </div>
                            </div>
                          </div>
                        </VTimelineItem>
                        <VTimelineItem
                          dot-color="teal-lighten-3"
                          size="small"
                        >
                          <template v-slot:opposite>
                            End Date
                          </template>
                          <div class="d-flex">
                            <div>
                              <div class="text-caption mb-2">
                                {{ task?.end_date }}
                              </div>
                            </div>
                          </div>
                        </VTimelineItem>
                      </VTimeline>
                      <div class="py-2">
                        <div class="text-h6">
                          {{ task?.name }}
                        </div>

                        <div class="font-weight-light text-medium-emphasis">
                          {{ task?.description }}
                        </div>
                      </div>
                    </VCardItem>

                    <VDivider />

                    <div class="pa-4 d-flex align-center justify-space-around">
                      <VBtn
                        class="me-2 text-none"
                        color="#4f545c"
                        variant="flat"
                      >
                        {{ task?.type }}
                      </VBtn>

                      <VBtn
                        class="text-none"
                        variant="text"
                        border
                      >
                        {{ task?.priority }}
                      </VBtn>
                      <VBtn
                        variant="flat"
                        color='#3371FF'
                        border
                      >
                        To In Progress
                      </VBtn>
                    </div>
                  </VCard>
                </VCard>
                <!--
                  <v-card
                  class="mx-auto  w-100"
                  :subtitle="task?.start_date"
                  :title="task?.name"
                  >
                  <template v-slot:append>
                  <v-avatar size="24">
                  <v-img
                  alt="John"
                  :src="task.owner?.photo"
                  ></v-img>
                  </v-avatar>
                  </template>
                  <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</v-card-text>
                  </v-card>
                -->
              </VExpansionPanelTitle>
              <VExpansionPanelText>
                <CardTask
                  :Task="task"
                  @edit-task="showModalEditTask(task)"
                />
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
          :title="`In Progress (${useTaskStore().tasksInprogress.length})`"
        >
          <template #append>
            <VAvatar
              color="surface-light"
              size="32"
            >
              <svg
                id="XMLID_103_"
                fill="#000000"
                height="64px"
                width="64px"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 24 24"
xml:space="preserve"
              ><g
                id="SVGRepo_bgCarrier"
                stroke-width="0"
              /><g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              /><g id="SVGRepo_iconCarrier"> <g id="in-progress"> <g> <path d="M23,24H1v-2h2.4c-1.6-5,1.6-7,3.7-8.4C8,13,8.9,12.5,8.9,12S8,10.9,7.1,10.4C5,9,1.8,7.1,3.4,2H1V0h22v2h-2.4 c1.6,5-1.6,7-3.7,8.4c-1,0.5-1.9,1.1-1.9,1.6s0.9,1.1,1.8,1.6c2.1,1.4,5.3,3.4,3.7,8.4H23V24z M5.6,22h12.8c1.6-4-0.5-5.3-2.6-6.7 C14.4,14.5,13,13.6,13,12c0-1.6,1.4-2.5,2.8-3.3C17.9,7.3,20,6,18.4,2H5.6C4,6,6.1,7.3,8.2,8.7C9.6,9.5,11,10.4,11,12 c0,1.6-1.4,2.5-2.8,3.3C6.1,16.7,4,18,5.6,22z" /> </g> <g> <path d="M16.8,23H7c-0.3-1.5,0.2-2.4,2.3-4.3c0.8-0.7,1.8-1.5,2.7-2.8c1,1.2,2,2.1,2.7,2.8C16.8,20.7,17.3,21,16.8,23z" /> </g> <g> <path d="M9.4,6c-0.7,1.3-0.7,1.3,0.9,2.1c0.5,0.2,1.1,0.5,1.6,0.9c0.5-0.4,1.2-0.7,1.6-0.9c1.7-0.8,1.7-0.8,1-2.1" /> </g> </g> </g></svg>
            </VAvatar>
          </template>
          <VExpansionPanels>
            <VExpansionPanel
              v-for="(task, index) in useTaskStore().tasksInprogress"
              :key="index"
            >
              <VExpansionPanelTitle>
                {{ task.name }}
              </VExpansionPanelTitle>
              <CardTask :Task="task" />
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
          :title="`Done (${useTaskStore().tasksDone.length})`"
        >
          <template #append>
            <VAvatar
              color="surface-light"
              size="32"
            >
              <svg
                width="64px"
                height="64px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              ><g
                id="SVGRepo_bgCarrier"
                stroke-width="0"
              /><g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              /><g id="SVGRepo_iconCarrier"> <path
                d="M9 10L12.2581 12.4436C12.6766 12.7574 13.2662 12.6957 13.6107 12.3021L20 5"
                stroke="#33363F"
                stroke-width="2"
                stroke-linecap="round"
              /> <path
                d="M21 12C21 13.8805 20.411 15.7137 19.3156 17.2423C18.2203 18.7709 16.6736 19.9179 14.893 20.5224C13.1123 21.1268 11.187 21.1583 9.38744 20.6125C7.58792 20.0666 6.00459 18.9707 4.85982 17.4789C3.71505 15.987 3.06635 14.174 3.00482 12.2945C2.94329 10.415 3.47203 8.56344 4.51677 6.99987C5.56152 5.4363 7.06979 4.23925 8.82975 3.57685C10.5897 2.91444 12.513 2.81996 14.3294 3.30667"
                stroke="#33363F"
                stroke-width="2"
                stroke-linecap="round"
              /> </g></svg>
            </VAvatar>
          </template>
          <VExpansionPanels>
            <VExpansionPanel
              v-for="(task, index) in useTaskStore().tasksDone"
              :key="index"
            >
              <VExpansionPanelTitle>
                {{ task.name }}
              </VExpansionPanelTitle>
              <CardTask
                :Task="task"
                @edit-task="showModalEditTask"
              />
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
              <EditTaskForm
                :task="taskAEdit"
                @handle-submit="showModalEdit = false"
              />
            </VCardText>
          </VCard>
        </template>
      </Modal>
    </Teleport>
  </div>
</template>
