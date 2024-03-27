<script lang="ts" setup>
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const form = ref({
  name: '',
  priority: '',
  status: '',
  date_began: '',
  date_end: '',
  type: '',
  description: '',
  employed: '',
})

const rules = {
  name: { required },
  priority: { required },
  status: { required },
  date_began: { required },
  date_end: { required },
  type: { required },
  description: { required },
  employed: { required },
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
        <VSelect
          v-model="form.priority"
          label="Priority"
          :items="['test', 'test2']"
        />
        <div v-if="v$.priority.$error">
          <span
            v-if="!v$.priority.required.$response"
            style="color: red"
          >priority is required.</span>
        </div>
      </VCol>
      <VCol cols="12">
        <VSelect
          v-model="form.status"
          label="Status"
          :items="['test', 'test2']"
        />
        <div v-if="v$.status.$error">
          <span
            v-if="!v$.status.required.$response"
            style="color: red"
          >status is required.</span>
        </div>
      </VCol>
      <VCol cols="12">
          <VTextField
            v-model="form.date_began"
            label="Start"
            placeholder="John"
            type="date"
          />
        <div v-if="v$.date_end.$error">
        <span
          v-if="!v$.date_end.required.$response"
          style="color: red"
        >date began is required.</span>
        </div>
      </VCol>
      <VCol cols="12">

      <VTextField
        label="End"
        v-model="form.date_end"
        placeholder="John"
        type="date"
      />
        <div v-if="v$.date_end.$error">

        <span
          v--if="!v$.date_began.required.$response"
          style="color: red"
        >date end is required.</span>
        </div>
      </VCol>

      <VCol cols="12">
        <VSelect
          v-model="form.employed"
          label="Assigne a"
          :items="['Texas', 'Wyoming']"
        />
        <div v-if="v$.employed.$error">
          <span
            v-if="!v$.employed.required.$response"
            style="color: red"
          >Username is required.</span>
        </div>
      </VCol>

      <VCol cols="12">
        <VTextField
          label="Description"
          v-model="form.description"
          outlined
        />
        <div v-if="v$.description.$error">
          <span
            v-if="!v$.description.required.$response"
            style="color: red"
          >Username is required.</span>
        </div>
      </VCol>
      <VCol cols="12">
        <label>Type</label>
        <VRow>
          <VCol cols="12">
            <VRadio label="Feature" v-model="form.type" />
            <VRadio label="Bug"  v-model="form.type" />
          </VCol>
        </VRow>
        <div v-if="v$.type.$error">
          <span
            v-if="!v$.type.required.$response"
            style="color: red"
          >Username is required.</span>
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
