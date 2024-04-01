<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { email, minLength, required } from '@vuelidate/validators'
import { useAutStore } from '@/stores/auth'
import {router} from "@/plugins/router";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const auth = useAutStore()
const isPasswordVisible = ref(false)
const form = ref({
  email: '',
  password: '',
  // remember: false,
})
const rules = {
  email: { required, email },
  password: { required, minLength: minLength(6) },
}
const v$ = useVuelidate(rules, form)
const isLoanding=ref(false)
const $toast = useToast();
const handleSubmit = async () => {
  v$.value.$touch()
  if (!v$.value.$error) {
    isLoanding.value=true
    await auth.login(form.value.email, form.value.password).then(response => {
      $toast.open({
        message: 'Bienvenue',
        type: 'success',
        position:"top-right"
      });
      router.push({ name: "Dashboard" });
    }).catch(error=>{
   $toast.open({
        message: error,
        type: 'error',
        position:"top-right"
      });
    })
    isLoanding.value=false
  }
  else {
    // Afficher des erreurs
  }
}

</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="text-center">
          <div>
            <img class='w-25  rounded rounded-pill' src='../assets/images/logos/stayinmedia_logo.jpeg'>
          </div>
     </VCardItem>

      <VCardText class="text-center">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Welcome to <strong>StayInMedia</strong>! 👋🏻
        </h5>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                type="email"
              />
              <div v-if="v$.email.$error">
                <span
                  v-if="!v$.email.required.$response"
                  style="color: red"
                >Username is required.</span>
              </div>
            </VCol>
            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <div v-if="v$.password.$error">
                <span
                  v-if="!v$.password.required.$response"
                  style="color: red"
                >Username is required.</span>
              </div>
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
              </div>
              <VBtn
                block
                @click="handleSubmit"
              >
                <div class="flex">
                  <span>Login</span>
                  <span v-if="isLoanding">
                    <VProgressCircular
                    color="primary"
                    indeterminate
                  /></span>
                </div>
              </VBtn>
            </VCol>
            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>New on our platform?</span>
              <RouterLink
                class="text-primary ms-2"
                to="/register"
              >
                Create an account
              </RouterLink>
            </VCol>


            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
