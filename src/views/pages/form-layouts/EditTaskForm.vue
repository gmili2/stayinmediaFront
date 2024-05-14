<script lang="ts" setup>
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
const props =  defineProps({
  task: {
    type: Object,
    required: true,
  }
})
const form = ref({
  name: props.task.name,
  id: props.task.id,
  priority:  props.task.priority,
  status:  props.task.status,
  start_date:  props.task.start_date,
  end_date:  props.task.end_date,
  type:  props.task.type,
  description:  props.task.description,
  owner:  props.task.owner.username,
})
console.log(props.task.owner)
const rules = {
  name: { required },
  priority: { required },
  status: { required },
  start_date: { required },
  end_date: { required },
  type: { required },
  description: { required },
  owner: { required },
}

const v$ = useVuelidate(rules, form)
import {useTaskStore} from "@/stores/task";
import {useToast} from "vue-toast-notification";
const $toast = useToast();

const handleSubmit = async () => {
  alert("update")
  console.log(v$.value.$touch(),v$.value.$error);
  if (!v$.value.$error) {
    await useTaskStore().editTask(form.value).then(async (response:any)  =>{
      $toast.open({
        message: 'Task added successfully',
        type: 'success',
        position:"top-right"
      });
      await useTaskStore().getAllTaskById("TODO");
      await useTaskStore().getAllTaskById("IN_PROGRESS");
      await useTaskStore().getAllTaskById('DONE');
    })
    emit('handleSubmit')
  }
}
const emit = defineEmits(['handleSubmit'])

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
          :items="[{name:'Low',id:21}, {name:'Hi',id:22}]"
          item-title="name"
          item-value="id"       />
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
          :items="[{name:'TODO',id:25}, {name:'IN_PROGRESS',id:2,name:'IN_PROGRESS',id:27}]"
          item-title="name"
          item-value="id"        />
        <div v-if="v$.status.$error">
          <span
            v-if="!v$.status.required.$response"
            style="color: red"
          >status is required.</span>
        </div>
      </VCol>
      <VCol cols="12">
          <VTextField
            v-model="form.start_date"
            label="Start"
            placeholder="John"
            type="datetime-local"
          />
        <div v-if="v$.end_date.$error">
        <span
          v-if="!v$.end_date.required.$response"
          style="color: red"
        >date began is required.</span>
        </div>
      </VCol>
      <VCol cols="12">

      <VTextField
        label="End"
        v-model="form.end_date"
        placeholder="John"
        type="datetime-local"
      />
        <div v-if="v$.end_date.$error">

        <span
          v--if="!v$.start_date.required.$response"
          style="color: red"
        >date end is required.</span>
        </div>
      </VCol>

      <VCol cols="12">
        <VSelect
          v-model="form.owner"
          label="Assigne a"
          :items="[{name:'Texas',id:27}, {name:'test',id:28}]"
          item-title="name"
          item-value="id"
        />
        <div v-if="v$.owner.$error">
          <span
            v-if="!v$.owner.required.$response"
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
          <v-radio-group v-model="form.type">
            <VRadio v-for="type in [{type:'Bug',id:19},{type:'Feature',id:20}]" :key="type.id" :label="type.type" :value="type.id" />
          </v-radio-group>
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
