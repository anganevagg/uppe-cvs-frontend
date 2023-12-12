<template>
  <div class="row items-center justify-center">
    <q-form ref="loginForm" class="q-gutter-y-md">
      <span class="text-center col-12 login-label">
        Iniciar Sesión
      </span>
      <q-input class="col-12" v-model="email" label="Correo" :rules="rules.email" lazy-rules no-error-icon tabindex="1">

      </q-input>
      <q-input class="col-12" v-model="password" label="Contraseña" :type="showPassword ? 'text' : 'password'"
        tabindex="2" no-error-icon :rules="rules.required">
        <template #append>
          <q-btn padding="none" unelevated @click="showPassword = !showPassword">
            <q-icon :name="showPassword ? 'visibility_off' : 'visibility'">

            </q-icon>
          </q-btn>
        </template>
      </q-input>
      <div class="row">
        <q-btn color="primary" @click="login" :loading="loadingLogin" tabindex="3" class="col-12">
          Entrar
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
import { useLoginStore } from 'stores/login';
import { useRouter } from 'vue-router';

const showPassword = ref(false)
const authService = new AuthService()
const email = ref('')
const password = ref('')
const router = useRouter()
let loginForm: Ref<QForm | null> = ref(null)
const store = useLoginStore()
const loadingLogin = ref(false)
const login = async () => {
  if (!loginForm.value) return
  const success = await loginForm.value.validate()
  if (!success) return
  await authService.login(loadingLogin, email.value, password.value)
  if (store.token) {
    router.push({
      path: '/'
    })
  }
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
