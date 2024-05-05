<script lang="ts" setup>
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import {useAutStore} from "@/stores/auth";
import {useUserStore} from "@/stores/user";
import {useRoleStore} from "@/stores/role";
import {useToast} from "vue-toast-notification";

const form = ref({
  username: '',
  email: '',
  roles: [],
  photo: "null",
  password: '',
  password_confirm: '',
})
const isLoanding=ref(false)

const rules = {
  username: { required },
  email: { required },
  roles: { required },
  password: { required },
  password_confirm: { required },
}

const v$ = useVuelidate(rules, form)
const userStore = useUserStore()
const $toast = useToast();
const isSubmit=ref(false);
const handleSubmit = async () => {
  isLoanding.value=true
  isSubmit.value = true
  v$.value.$touch()
  if (!v$.value.$error && form.value.password === form.value.password_confirm) {
    await userStore.addUser(form.value).then(async(respoonse:any) => {
      console.log("hahha", respoonse)
      if (respoonse.error)
        $toast.open({
          message: respoonse.error,
          type: 'error',
          position: "top-right"
        });
      else {
      $toast.open({
        message: 'bien ajouté',
        type: 'success',
        position: "top-right"
      });
      }
    })
  }

  isLoanding.value=false
  emit('handleSubmit')

}
const emit = defineEmits(['handleSubmit'])
const roles=ref(['Admin', 'developer'])
const getAllRoles=async ()=>{
  await useRoleStore().getAllRoles();
}
</script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <VTextField
          v-model="form.username"
          label="Task name"
          placeholder="John"
        />
        <div v-if="v$.username.$error">
          <span
            v-if="!v$.username.required.$response"
            style="color: red"
          >name is required.</span>
        </div>
      </VCol>

      <VCol cols="12">
        <VTextField
          v-model="form.email"
          label="Email"
          placeholder="John@test.com"
        />
        <div v-if="v$.email.$error">
          <span
            v-if="!v$.email.required.$response"
            style="color: red"
          >email is required.</span>
        </div>
      </VCol>
      <VCol cols="12">
        <VSelect
          v-model="form.roles"
          label="Role"
          multiple="true"
          :items="roles"
        />
        <div v-if="v$.roles.$error">
          <span
            v-if="!v$.roles.required.$response"
            style="color: red"
          >role is required.</span>
        </div>
      </VCol>
      <VCol cols="12">
        <VTextField
          v-model="form.password"
          label="password"
          type="password"
        />
        <div v-if="v$.password.$error">
          <span
            v-if="!v$.password.required.$response"
            style="color: red"
          >password is required.</span>
        </div>
      </VCol>
      <VCol cols="12">
        <VTextField
          v-model="form.password_confirm"
          label="password confirm"
          type="password"
        />
        <div v-if="v$.password_confirm.$error">
          <span
            v-if="!v$.password_confirm.required.$response"
            style="color: red"
          >password is required.</span>


        </div>
        <div  v-else-if="form.password_confirm!=form.password && isSubmit">
        <span
          style="color: red"
        >password doesnt match</span>
        </div>
      </VCol>
      <VCol
        cols="12"
        class="d-flex gap-4"
      >
        <VBtn type="submit" @click="handleSubmit">
          Submit
        </VBtn>

        <VBtn
          type="reset"
          color="secondary"
          variant="outlined"
        >
          Reset
        </VBtn>
      </VCol>
    </VRow>
  </VForm>
</template>
