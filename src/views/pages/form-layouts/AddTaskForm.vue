<script lang="ts" setup>
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const form = ref({
  name: '',
  priority: '',
  status: '',
  date_begin: '',
  date_end: '',
  type: '',
  description: '',
  employed: '',

  // remember: false,
})

const rules = {
  name: { required },
  priority: { required },
  status: { required },
  date_begin: { required },
  type: { required },
  description: { required },
  employed: { required },
}

const v$ = useVuelidate(rules, form)
</script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <VTextField
          label="Task name"
          placeholder="John"
        />
        <div v-if="v$.name.$error">
          <span
            v-if="!v$.name.required.$response"
            style="color: red"
          >Username is required.</span>
        </div>
      </VCol>

      <VCol cols="12">
        <VSelect
          label="Priority"
          :items="['test', 'test2']"
        />
        <div v-if="v$.priority.$error">
          <span
            v-if="!v$.priority.required.$response"
            style="color: red"
          >Username is required.</span>
        </div>
      </VCol>
      <VCol cols="12">
        <VSelect
          label="Status"
          :items="['test', 'test2']"
        />
        <div v-if="v$.status.$error">
          <span
            v-if="!v$.status.required.$response"
            style="color: red"
          >Username is required.</span>
        </div>
      </VCol>
      <VCol cols="12">
        <VRow class="flex ga-4">
          <VTextField
            label="Start"
            placeholder="John"
            type="date"
          />
          <VTextField
            label="End"
            placeholder="John"
            type="date"
          />
        </VRow>
        <div v-if="v$.date_begin.$error">
          <span
            v-if="!v$.date_begin.required.$response"
            style="color: red"
          >Username is required.</span>
        </div>
      </VCol>
      <VCol cols="12">
        <VSelect
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
            <VRadio label="Feature" />
            <VRadio label="Bug" />
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
        <VBtn type="submit">
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
