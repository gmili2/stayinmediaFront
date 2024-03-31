<script lang="ts" setup>
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const form = ref({
  name: '',
  email: '',
  role: '',
  password: '',
  password_confirm: '',
})

const rules = {
  name: { required },
  email: { required },
  role: { required },
  password: { required },
  password_confirm: { required },
}

const v$ = useVuelidate(rules, form)

const handleSubmit = () => {
  v$.value.$touch()
  console.log(!v$.value.$error)
  if (!v$.value.$error) {
    // auth.login(form.value.email, form.value.password)
    alert('send request Post add task')
  }
  else {
    // Afficher des erreurs
  }
}
</script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <VTextField
          v-model="form.name"
          label="Task name"
          placeholder="John"
        />
        <div v-if="v$.name.$error">
          <span
            v-if="!v$.name.required.$response"
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
          v-model="form.role"
          label="Role"
          :items="['Admin', 'developer']"
        />
        <div v-if="v$.role.$error">
          <span
            v-if="!v$.role.required.$response"
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
