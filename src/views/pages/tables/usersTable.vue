<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import Modal from "@/components/Modal.vue";
import {ref} from "vue";
import {useToast} from "vue-toast-notification";
const userStore = useUserStore()
let isLoading=ref(false)
const $toast = useToast();
const showModal = ref(false);
const idUserDelted=ref()
const  getAllUsers=async () => {
  isLoading.value=true
  await userStore.getAllUser();
  isLoading.value=false
}
getAllUsers();

const  deletUser=async () => {
  isLoading.value = true
  await userStore.deleteUser(idUserDelted.value).then(response => {
    $toast.open({
      message: 'User bien supprimé',
      type: 'success',
      position: "top-right"
    });
  }).catch(error => {
    $toast.open({
      message: 'Error',
      type: 'error',
      position: "top-right"
    });
  });
  showModal.value = false;
  await userStore.getAllUser();
  isLoading.value = false
}

function  showModalDelete(id: number){
  showModal.value=true;
  idUserDelted.value=id;
}


</script>

<template>
    <VTable
style="min-height: 250px;max-height: 500px"    fixed-header
  >
    <thead>
      <tr>
        <th class="text-uppercase">
name        </th>
        <th class="text-uppercase text-center">
          email
        </th>
        <th class="text-uppercase text-center">
          role
        </th>

        <th class="text-uppercase text-center">
actions
        </th>
      </tr>
    </thead>

    <tbody>
    <tr v-if="isLoading">
      <td class="py-2">  <VProgressCircular
        color="primary"
        indeterminate
      /></td>

      <td class="py-2">  <VProgressCircular
        color="primary"
        indeterminate
      /></td>
      <td class="py-2">  <VProgressCircular
        color="primary"
        indeterminate
      /></td>
      <td class="py-2">  <VProgressCircular
        color="primary"
        indeterminate
      /></td>
    </tr>
      <tr
        v-else
        v-for="item in useUserStore().users"
        :key="item.user"
      >
        <td>
          {{ item.username }}
        </td>
        <td class="text-center">
          {{ item.email }}
        </td>
        <td class="text-center">
          {{ item.roles }}
        </td>

        <td class="text-center">
          <i class="ri-delete-bin-line" @click="showModalDelete(item.id)"></i>
        </td>
      </tr>
    </tbody>
  </VTable>

  <Teleport to="body">
    <Modal
      :show="showModal"
      @close="showModal = false"
    >
      <template #header>
        <h3>Delete user</h3>
      </template>
      <template #body>
        <VCard>
          <VCardText>
            <div>
              Voulez-vous vraimenet supprimer cette User
            </div>
            <VCol
              cols="12"
              class="d-flex gap-4"
            >
              <VBtn  @click="deletUser" :disabled="isLoading">
                <div class="flex">
                  <span>oui</span>
                  <span v-if="isLoading">
                    <VProgressCircular
                      color="primary"
                      indeterminate
                    /></span>
                </div>
              </VBtn>

              <VBtn
               @click="showModal=false;idUserDelted==null"
                color="secondary"
                variant="outlined"
              >
                Reset
              </VBtn>
            </VCol>
          </VCardText>
        </VCard>
      </template>
    </Modal>
  </Teleport>
</template>
