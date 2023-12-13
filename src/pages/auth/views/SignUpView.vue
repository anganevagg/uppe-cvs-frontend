<template>
  <div class="row items-center justify-center">
    <q-form ref="signupForm" class="q-gutter-y-md">
      <span class="text-center col-12 login-label">
        Registrar
      </span>
      <q-input class="col-12" v-model="firstName" label="Nombre" :rules="rules.required" lazy-rules no-error-icon
        tabindex="1">

      </q-input>
      <q-input class="col-12" v-model="lastName" label="Apellidos" :rules="rules.required" lazy-rules no-error-icon
        tabindex="2">

      </q-input>
      <q-input class="col-12" v-model="password" label="Contraseña" :type="showPassword ? 'text' : 'password'"
        tabindex="3" no-error-icon :rules="rules.required">
        <template #append>
          <q-btn padding="none" unelevated @click="showPassword = !showPassword">
            <q-icon :name="showPassword ? 'visibility_off' : 'visibility'">

            </q-icon>
          </q-btn>
        </template>
      </q-input>
      <div class="row">
        <q-btn color="primary" @click="signup" :loading="loadingSignup" tabindex="4" class="col-12">
          Registrar
        </q-btn>
      </div>
    </q-form>
  </div>
</template>
<script lang="ts" setup>
import { Ref, ref } from 'vue';
import { rules } from '../../../helpers/rules'
import { QForm } from 'quasar';
import { AuthService } from '../service';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const code = route.params.code as string
const showPassword = ref(false)
const authService = new AuthService()
const firstName = ref('')
const lastName = ref('')
const password = ref('')
let signupForm: Ref<QForm | null> = ref(null)
const loadingSignup = ref(false)
const signup = async () => {
  if (!signupForm.value) return
  const success = await signupForm.value.validate()
  if (!success) return
  const registered = await authService.signup(loadingSignup, firstName.value, lastName.value, password.value, code)
  if (!registered) return
  router.push({
    name: 'Login'
  })
}
</script>

<style scoped>
.login-label {
  color: #333;
  font-family: Poppins;
  font-size: 50px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
</style>
