<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useVuelidate } from '@vuelidate/core'
import { email, minLength, required } from '@vuelidate/validators'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'

import logo from '@images/logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import { useAutStore } from '@/stores/auth'

const auth = useAutStore()

// or using an action instead
auth.increment()

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

const handleSubmit = () => {
  v$.value.$touch()
  console.log(!v$.value.$error)
  if (!v$.value.$error) {
    auth.login(form.value.email, form.value.password)

    // Soumettre le formulaire
  }
  else {
    // Afficher des erreurs
  }
}

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light'
    ? authV1MaskLight
    : authV1MaskDark
})

const isPasswordVisible = ref(false)
</script>

<template>
  hahah
  <!-- eslint-disable vue/no-v-html -->
  {{ auth.count }}
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div v-html="logo" />
          </div>
        </template>

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          Materio
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">
          Welcome to Materio! 👋🏻
        </h5>
        <p class="mb-0">
          Please sign-in to your account and start the adventure
        </p>
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

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <!--                <VCheckbox -->
                <!--                  v-model="form.remember" -->
                <!--                  label="Remember me" -->
                <!--                /> -->

                <!--                <a -->
                <!--                  class="ms-2 mb-1" -->
                <!--                  href="javascript:void(0)" -->
                <!--                > -->
                <!--                  Forgot Password? -->
                <!--                </a> -->
              </div>

              <!-- login button -->
              <VBtn
                block
                @click="handleSubmit"
              >
                <div class="flex-row ga-4">
                  <span>  Login</span>
                  <div />
                  <VProgressCircular
                    color="primary"
                    indeterminate
                  />
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

            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
