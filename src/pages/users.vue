
<template>
  <VCol cols="12">
    <VCard >
      <VCardTitle>
        <div style="display: flex; justify-content: space-between;">
          <div class="mt-4">
            Users
          </div>
          <div>
            <VRow class="justify-end mb-4 mt-2">
              <VBtn
                color="primary"
                @click="showModal = true"
              >
                Add User
              </VBtn>
            </VRow>
          </div>
        </div>
        <Teleport to="body">
          <Modal
            :show="showModal"
            @close="showModal = false"
          >
            <template #header>
              <h3>Add user</h3>
            </template>
            <template #body>
              <VCard>
                <VCardText>
                  <AddUserForm @handle-submit="showModal = false,useUserStore().getAllUser()"/>
                </VCardText>
              </VCard>
            </template>
          </Modal>
        </Teleport>
      </VCardTitle>
      <users-table />
    </VCard>
  </VCol>
</template>

<script setup lang="ts">
import UsersTable from "@/views/pages/tables/usersTable.vue";
import {ref} from "vue";
import Modal from "@/components/Modal.vue";
import AddUserForm from "@/views/pages/form-layouts/AddUserForm.vue";
import {useUserStore} from "@/stores/user";
const showModal = ref(false)
</script>
