<script lang="ts" setup>
const firstName = ref('')
const email = ref('')
const mobile = ref<number>()
const password = ref<string>()
const checkbox = ref(false)
</script>

<template>
  <VForm @submit.prevent="() => {}">
    <VRow>
      <VCol cols="12">
        <VTextField
          v-model="firstName"
          label="Task name"
          placeholder="John"
        />
      </VCol>

      <VCol cols="12">
        <VSelect  label="Priority"
                  :items="['test', 'test2']"
        ></VSelect>
      </VCol>
      <VCol cols="12">
        <VSelect  label="Status"
                  :items="['test', 'test2']"
        ></VSelect>
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
      </VCol>
      <VCol cols="12">
        <VSelect  label="Assigne a"
                  :items="['Texas', 'Wyoming']"
        ></VSelect>
      </VCol>


      <VCol cols="12">
        <VTextField label="Description" outlined></VTextField>
      </VCol>
      <VCol cols="12">
        <label>Type</label>
        <VRow >
          <VCol cols="12">
            <VRadio label="Feature"></VRadio>
            <VRadio label="Bug"></VRadio>
          </VCol>
        </VRow>
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
